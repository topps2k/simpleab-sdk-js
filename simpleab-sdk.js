const axios = require('axios');
const md5 = require('./md5');

// Class for support API URLs
class BaseAPIUrls
{
  static CAPTCHIFY_NA = 'api.captchify.com';
}

class SimpleABSDK
{
  constructor(apiURL, apiKey, experiments = [])
  {
    this.apiURL = apiURL;
    this.apiKey = apiKey;
    this.experiments = experiments;
    this.cache = new Map();
    this.client = axios.create({
      baseURL: apiURL,
      timeout: 10000,
      headers: { 'X-API-Key': apiKey }
    });

    if (experiments.length > 0)
    {
      this._loadExperiments(experiments).catch(console.error);
    }

    this._startCacheRefresh();
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
}

module.exports = { SimpleABSDK, BaseAPIUrls };