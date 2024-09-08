const axios = require('axios');
const md5 = require('./md5');

// Class for support API URLs
class BaseAPIUrls
{
  static CAPTCHIFY_NA = 'api.captchify.com';
}

// Class for aggregation types
class FlushIntervals
{
  static ONE_MINUTE = 60000;
  static FIVE_MINUTE = 300000;

  static isValid(type)
  {
    return [this.ONE_MINUTE, this.FIVE_MINUTE].includes(type);
  }
}

// Class for aggregation types
class AggregationTypes
{
  static SUM = 'sum';
  static AVERAGE = 'average';
  static PERCENTILE = 'percentile';

  static isValid(type)
  {
    return [this.SUM, this.AVERAGE, this.PERCENTILE].includes(type);
  }
}

// Class for treatment types
class Treatments
{
  static NONE = '';  // No treatment
  static CONTROL = 'C';  // Control treatment

  // Dynamically create T1 to T255 treatments
  static TREATMENTS = Array.from({ length: 255 }, (_, i) => `T${i + 1}`);

  static isValid(type)
  {
    return [this.NONE, this.CONTROL, ...this.TREATMENTS].includes(type);
  }
}


class SimpleABSDK
{
  constructor(apiURL, apiKey, experiments = [], flushInterval = FlushIntervals.ONE_MINUTE)
  {
    if (!FlushIntervals.isValid(flushInterval))
    {
      throw new Error("Invalid Flush Interval")
    }

    this.apiURL = apiURL;
    this.apiKey = apiKey;
    this.experiments = experiments;
    this.cache = new Map();
    this.client = axios.create({
      baseURL: apiURL,
      timeout: 10000,
      headers: { 'X-API-Key': apiKey }
    });

    // New properties for metric tracking
    this.buffer = {};
    this.flushInterval = flushInterval;

    if (experiments.length > 0)
    {
      this._loadExperiments(experiments).catch(console.error);
    }

    this._startCacheRefresh();
    this._startBufferFlush(); // Start the buffer flush interval
  }

  async getTreatment(experimentID, stage, allocationKey, dimension)
  {
    const exp = await this._getExperiment(experimentID);

    try
    {
      // Check for overrides
      const override = this._checkForOverride(exp, stage, dimension, allocationKey);
      if (override)
      {
        return override;
      }

      const stageData = exp.stages.find(s => s.stage === stage);

      if (!stageData)
      {
        throw new Error(`Stage ${stage} not found for experiment ${experimentID}`);
      }

      const stageDimension = stageData.stageDimensions.find(sd => sd.dimension === dimension);

      if (!stageDimension)
      {
        throw new Error(`Dimension ${dimension} not found for stage ${stage} in experiment ${experimentID}`);
      }

      if (!stageDimension.enabled)
      {
        return '';
      }

      const allocationHash = this._calculateHash(allocationKey + exp.allocationRandomizationToken);
      const exposureHash = this._calculateHash(allocationKey + exp.exposureRandomizationToken);

      if (!this._isInExposureBucket(exposureHash, stageDimension.exposure))
      {
        return '';
      }

      const treatment = this._determineTreatment(allocationHash, stageDimension.treatmentAllocations);
      return treatment || '';
    } catch (error)
    {
      return '';
    }
  }

  _checkForOverride(experiment, stage, dimension, allocationKey)
  {
    if (!experiment.overrides)
    {
      return null;
    }

    for (const override of experiment.overrides)
    {
      if (override.allocationKey === allocationKey)
      {
        for (const stageOverride of override.stageOverrides)
        {
          if (stageOverride.stage === stage &&
            stageOverride.enabled &&
            stageOverride.dimensions.includes(dimension))
          {
            return stageOverride.treatment;
          }
        }
      }
    }

    return null;
  }

  async _getExperiment(experimentID)
  {
    if (this.cache.has(experimentID))
    {
      return this.cache.get(experimentID);
    }

    await this._loadExperiments([experimentID]);

    if (!this.cache.has(experimentID))
    {
      throw new Error(`Experiment ${experimentID} not found`);
    }

    return this.cache.get(experimentID);
  }

  async _loadExperiments(experimentIDs)
  {
    try
    {
      const batchSize = 50;
      for (let i = 0; i < experimentIDs.length; i += batchSize)
      {
        const batch = experimentIDs.slice(i, i + batchSize);
        const response = await this.client.post('/experiments/batch/list', { ids: batch });

        if (response.status !== 200)
        {
          throw new Error(`API request failed with status code: ${response.status}`);
        }

        const result = response.data;

        for (const exp of result.success)
        {
          this.cache.set(exp.id, exp);
        }
      }
    } catch (error)
    {
      console.error('Error loading experiments:', error);
      throw error;
    }
  }

  _startCacheRefresh()
  {
    this.cacheRefreshInterval = setInterval(() => this._refreshCache(), 10 * 60 * 1000);
  }

  close()
  {
    if (this.cacheRefreshInterval)
    {
      clearInterval(this.cacheRefreshInterval);
      this.cacheRefreshInterval = null;
    }
    if (this.bufferFlushInterval)
    {
      clearInterval(this.bufferFlushInterval);
      this.bufferFlushInterval = null;
    }
    // Add any additional cleanup logic here if needed
  }

  async _refreshCache()
  {
    try
    {
      const cacheKeys = Array.from(this.cache.keys());
      await this._loadExperiments(cacheKeys);
    } catch (error)
    {
      console.error('Error refreshing experiments:', error);
    }
  }

  _calculateHash(input)
  {
    return md5(input);
  }

  _isInExposureBucket(hash, exposure)
  {
    const hashInt = parseInt(hash.substring(0, 8), 16);
    return (hashInt / 0xffffffff) < exposure;
  }

  _determineTreatment(hash, treatmentAllocations)
  {
    const hashFloat = parseInt(hash.substring(0, 8), 16) / 0xffffffff;
    let cumulativeProbability = 0;

    for (const allocation of treatmentAllocations)
    {
      cumulativeProbability += allocation.allocation;
      if (hashFloat < cumulativeProbability)
      {
        return allocation.id;
      }
    }

    return '';
  }

  // New methods for metric tracking and flushing

  /**
   * Track a metric.
   * @param {Object} params - Parameters for tracking the metric.
   * @param {string} params.experimentID - The experiment ID.
   * @param {string} params.stage - The experiment stage.
   * @param {string} params.dimension - The dimension for the metric.
   * @param {string} params.treatment - The treatment group for the experiment.
   * @param {string} params.metricName - The name of the metric.
   * @param {number} params.metricValue - The value of the metric.
   * @param {string} params.aggregationType - 'sum', 'average', or 'percentile' defines how the metric should be aggregated.
   */
  async trackMetric({ experimentID, stage, dimension, treatment, metricName, metricValue, aggregationType = AggregationTypes.SUM })
  {

    if (!Treatments.isValid(treatment)) 
    {
      throw new Error('Invalid treatment string');
    }

    // Validate aggregation type
    if (!AggregationTypes.isValid(aggregationType))
    {
      throw new Error(`Invalid aggregation type: ${aggregationType}`);
    }

    if (treatment === '')
    {
      return;
    }
    // Validate experiment, stage, and dimension
    const experiment = await this._getExperiment(experimentID);
    const stageData = experiment.stages.find(s => s.stage === stage);
    if (!stageData)
    {
      throw new Error(`Stage ${stage} not found for experiment ${experimentID}`);
    }
    const stageDimension = stageData.stageDimensions.find(sd => sd.dimension === dimension);
    if (!stageDimension)
    {
      throw new Error(`Dimension ${dimension} not found for stage ${stage} in experiment ${experimentID}`);
    }

    const treatmentData = experiment.treatments.find(t => t.id === treatment);
    if (!treatmentData)
    {
      throw new Error(`Treatment ${treatment} in experiment ${experimentID}`);
    }

    const key = `${experimentID}-${stage}-${dimension}-${treatment}-${metricName}-${aggregationType}`;

    // Initialize or aggregate metric in the buffer
    if (!this.buffer[key])
    {
      this.buffer[key] = { sum: 0, count: 0, values: [] };
    }

    this.buffer[key].sum += metricValue;
    this.buffer[key].count += 1;

    // Track values for percentiles
    if (aggregationType === AggregationTypes.PERCENTILE)
    {
      this.buffer[key].values.push(metricValue); // Collect raw values for percentile calculation
    }
  }

  // Periodically flush metrics based on time (every minute)
  _startBufferFlush()
  {
    this.bufferFlushInterval = setInterval(() =>
    {
      if (Object.keys(this.buffer).length > 0)
      {
        this._flushMetrics();
      }
    }, this.flushInterval);
  }

  // Helper function to calculate percentiles
  _calculatePercentiles(values, percentiles)
  {
    if (values.length === 0) return {};

    values.sort((a, b) => a - b); // Sort values to calculate percentiles
    const results = {};

    percentiles.forEach(percentile =>
    {
      const idx = Math.ceil((percentile / 100) * values.length) - 1;
      results[percentile] = values[idx];
    });

    return results;
  }

  // Flush metrics to the backend server
  async _flushMetrics()
  {
    const metricsBatch = Object.entries(this.buffer).map(([key, value]) =>
    {
      const [experimentID, stage, dimension, treatment, metricName, aggregationType] = key.split('-');

      let metricValue;
      if (aggregationType === AggregationTypes.AVERAGE)
      {
        metricValue = value.sum / value.count; // Calculate the average
      } else if (aggregationType === AggregationTypes.PERCENTILE)
      {
        const percentiles = this._calculatePercentiles(value.values, [50, 90, 99]);
        return {
          experimentID,
          stage,
          dimension,
          treatment,
          metricName,
          p50: percentiles[50],
          p90: percentiles[90],
          p99: percentiles[99],
          count: value.count
        };
      } else
      {
        metricValue = value.sum; // For sum, just use the sum
      }

      return {
        experimentID,
        stage,
        dimension,
        treatment,
        metricName,
        aggregationType,
        value: metricValue,
        count: value.count // Include count for further aggregation if needed
      };
    });

    this.buffer = {};  // Clear buffer after sending

    try
    {
      await this.client.post('/metrics/track/batch', { metrics: metricsBatch });
    }
    catch (error)
    {
      console.error('Error sending metrics batch:', error);
    }
  }
}

module.exports = { SimpleABSDK, BaseAPIUrls, AggregationTypes, Treatments };