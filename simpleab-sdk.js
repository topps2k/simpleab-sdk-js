// Removed axios requirement
const md5 = require('./md5');

// Add fetch polyfill if it's not available
if (typeof fetch === 'undefined')
{
  require('isomorphic-fetch');
}

// Class for support API URLs
class BaseAPIUrls
{
  static CAPTCHIFY_NA = 'https://api.captchify.com';
}

// Class for aggregation types
class FlushIntervals
{
  static ONE_MINUTE = 60000;

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

// Class for treatment types
class Stages
{
  static BETA = 'Beta';  // No treatment
  static PROD = 'Prod';  // Control treatment

  static isValid(type)
  {
    return [this.BETA, this.PROD].includes(type);
  }
}

class SimpleABSDK
{
  constructor(apiURL, apiKey, experiments = [])
  {
    this.apiURL = apiURL;
    this.apiKey = apiKey;
    this.experiments = experiments;
    this.cache = new Map();

    // New properties for metric tracking
    this.buffer = {};
    this.flushInterval = FlushIntervals.ONE_MINUTE;

    if (experiments.length > 0)
    {
      this._loadExperiments(experiments).catch((error) =>
      {
        console.log('Error loading experiments:', error.message);
      });
    }

    this._startCacheRefresh();
    this._startBufferFlush(); // Start the buffer flush interval
  }

  async getTreatment(experimentID, stage, dimension, allocationKey)
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
        const response = await fetch(`${this.apiURL}/experiments/batch/list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': this.apiKey
          },
          body: JSON.stringify({ ids: batch })
        });

        if (!response.ok)
        {
          throw new Error(`API request failed with status code: ${response.status}`);
        }

        const result = await response.json();

        for (const exp of result.success)
        {
          this.cache.set(exp.id, exp);
        }
      }
    } catch (error)
    {
      console.error('Error loading experiments:', error.message);
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
      console.error('Error refreshing experiments:', error.message);
    }
  }

  _calculateHash(input)
  {
    return md5(input);
  }

  _isInExposureBucket(hash, exposure)
  {
    const hashInt = parseInt(hash.substring(0, 8), 16);
    if (hashInt === 0xffffffff && exposure === 100)
    {
      return true;
    }
    if (hashInt === 0x00000000 && exposure === 0)
    {
      return false;
    }
    return (hashInt / 0xffffffff) < (exposure / 100);
  }

  _determineTreatment(hash, treatmentAllocations)
  {
    const hashFloat = parseInt(hash.substring(0, 8), 16) / 0xffffffff;
    let cumulativeProbability = 0;

    for (const allocation of treatmentAllocations)
    {
      cumulativeProbability += allocation.allocation / 100;
      if (hashFloat < cumulativeProbability)
      {
        return allocation.id;
      }
    }

    return '';
  }

  async trackMetric({ experimentID, stage, dimension, treatment, metricName, metricValue, aggregationType = AggregationTypes.SUM })
  {
    if (!Treatments.isValid(treatment))
    {
      throw new Error('Invalid treatment string');
    }

    if (!Stages.isValid(stage))
    {
      throw new Error('Invalid stage string');
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

    if (aggregationType === AggregationTypes.SUM && metricValue < 0)
    {
      throw new Error(`Metric ${metricName} cannot be negative for AggregrationTypes.SUM`)
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
          aggregationType,
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

    // Batch metrics in sizes of 150
    const batchSize = 150;
    const batches = [];
    for (let i = 0; i < metricsBatch.length; i += batchSize)
    {
      batches.push(metricsBatch.slice(i, i + batchSize));
    }

    // Send batches in parallel
    try
    {
      await Promise.all(batches.map(async batch =>
      {
        try
        {
          const response = await fetch(`${this.apiURL}/metrics/track/batch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': this.apiKey
            },
            body: JSON.stringify({ metrics: batch })
          });

          if (!response.ok)
          {
            throw new Error(`API request failed with status code: ${response.status}`);
          }
        } catch (error)
        {
          console.error('Error sending metrics batch:', error.message);
        }
      }));

      this.buffer = {};  // Clear buffer after sending
    }
    catch (error)
    {
      console.error('Error sending metrics batches:', error.message);
    }
  }

  // New public method to manually trigger metrics flush
  async flush()
  {
    await this._flushMetrics();
  }
}

module.exports = { SimpleABSDK, BaseAPIUrls, AggregationTypes, Treatments, Stages };