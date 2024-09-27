/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const {
  SimpleABSDK,
  BaseAPIUrls,
  AggregationTypes,
  Treatments,
  Stages
} = __webpack_require__(639);

// If we're in a browser environment, add SimpleABSDK to the window object
if (typeof window !== 'undefined') {
  window.SimpleABSDK = SimpleABSDK;
  window.BaseAPIUrls = BaseAPIUrls;
  window.AggregationTypes = AggregationTypes;
  window.Treatments = Treatments;
  window.Stages = Stages;
}
module.exports = {
  SimpleABSDK,
  BaseAPIUrls,
  AggregationTypes,
  Treatments,
  Stages
};

/***/ }),

/***/ 203:
/***/ ((module) => {



function md5cycle(x, k) {
  var a = x[0],
    b = x[1],
    c = x[2],
    d = x[3];
  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17, 606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12, 1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22, 1236535329);
  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14, 643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9, 38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14, 1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);
  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16, 1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11, 1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16, 530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);
  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10, 1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15, 718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);
  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);
}
function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32(a << s | a >>> 32 - s, b);
}
function ff(a, b, c, d, x, s, t) {
  return cmn(b & c | ~b & d, a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t) {
  return cmn(b & d | c & ~d, a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}
function md51(s) {
  var n = s.length,
    state = [1732584193, -271733879, -1732584194, 271733878],
    i;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
  tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) tail[i] = 0;
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) {
  /* I figured global was faster.   */
  var md5blks = [],
    i; /* Andy King said do it this way. */
  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}
var hex_chr = '0123456789abcdef'.split('');
function rhex(n) {
  var s = '',
    j = 0;
  for (; j < 4; j++) s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];
  return s;
}
function hex(x) {
  for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]);
  return x.join('');
}
function md5(s) {
  return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
  return a + b & 0xFFFFFFFF;
}
if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
  function add32(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xFFFF;
  }
}

// Export the md5 function
module.exports = md5;

/***/ }),

/***/ 639:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



// Removed axios requirement
const md5 = __webpack_require__(203);
const fetch = __webpack_require__(335);

// Class for support API URLs
class BaseAPIUrls {
  static CAPTCHIFY_NA = 'https://api.captchify.com';
}

// Class for aggregation types
class FlushIntervals {
  static ONE_MINUTE = 60000;
  static isValid(type) {
    return [this.ONE_MINUTE, this.FIVE_MINUTE].includes(type);
  }
}

// Class for aggregation types
class AggregationTypes {
  static SUM = 'sum';
  static AVERAGE = 'average';
  static PERCENTILE = 'percentile';
  static isValid(type) {
    return [this.SUM, this.AVERAGE, this.PERCENTILE].includes(type);
  }
}

// Class for treatment types
class Treatments {
  static NONE = ''; // No treatment
  static CONTROL = 'C'; // Control treatment

  // Dynamically create T1 to T255 treatments
  static TREATMENTS = Array.from({
    length: 255
  }, (_, i) => `T${i + 1}`);
  static isValid(type) {
    return [this.NONE, this.CONTROL, ...this.TREATMENTS].includes(type);
  }
}

// Class for treatment types
class Stages {
  static BETA = 'Beta'; // No treatment
  static PROD = 'Prod'; // Control treatment

  static isValid(type) {
    return [this.BETA, this.PROD].includes(type);
  }
}

// New Segment class definition
class Segment {
  constructor(countryCode, region, deviceType) {
    this.countryCode = countryCode || '';
    this.region = region || '';
    this.deviceType = deviceType || '';
  }
  static fromJSON(json) {
    return new Segment(json.countryCode, json.region, json.deviceType);
  }
  toJSON() {
    return {
      countryCode: this.countryCode,
      region: this.region,
      deviceType: this.deviceType
    };
  }
}
class SimpleABSDK {
  constructor(apiURL, apiKey, experiments = []) {
    this.apiURL = apiURL;
    this.apiKey = apiKey;
    this.experiments = experiments;
    this.cache = new Map();

    // New properties for metric tracking
    this.buffer = {};
    this.flushInterval = FlushIntervals.ONE_MINUTE;
    if (experiments.length > 0) {
      this._loadExperiments(experiments).catch(error => {
        console.log('Error loading experiments:', error.message);
      });
    }
    this._startCacheRefresh();
    this._startBufferFlush(); // Start the buffer flush interval
  }
  async getTreatment(experimentID, stage, dimension, allocationKey) {
    const exp = await this._getExperiment(experimentID);
    try {
      // Check for overrides
      const override = this._checkForOverride(exp, stage, dimension, allocationKey);
      if (override) {
        return override;
      }
      const stageData = exp.stages.find(s => s.stage === stage);
      if (!stageData) {
        throw new Error(`Stage ${stage} not found for experiment ${experimentID}`);
      }
      const stageDimension = stageData.stageDimensions.find(sd => sd.dimension === dimension);
      if (!stageDimension) {
        throw new Error(`Dimension ${dimension} not found for stage ${stage} in experiment ${experimentID}`);
      }
      if (!stageDimension.enabled) {
        return '';
      }
      const allocationHash = this._calculateHash(allocationKey + exp.allocationRandomizationToken);
      const exposureHash = this._calculateHash(allocationKey + exp.exposureRandomizationToken);
      if (!this._isInExposureBucket(exposureHash, stageDimension.exposure)) {
        return '';
      }
      const treatment = this._determineTreatment(allocationHash, stageDimension.treatmentAllocations);
      return treatment || '';
    } catch (error) {
      return '';
    }
  }
  _checkForOverride(experiment, stage, dimension, allocationKey) {
    if (!experiment.overrides) {
      return null;
    }
    for (const override of experiment.overrides) {
      if (override.allocationKey === allocationKey) {
        for (const stageOverride of override.stageOverrides) {
          if (stageOverride.stage === stage && stageOverride.enabled && stageOverride.dimensions.includes(dimension)) {
            return stageOverride.treatment;
          }
        }
      }
    }
    return null;
  }
  async _getExperiment(experimentID) {
    if (this.cache.has(experimentID)) {
      return this.cache.get(experimentID);
    }
    await this._loadExperiments([experimentID]);
    if (!this.cache.has(experimentID)) {
      throw new Error(`Experiment ${experimentID} not found`);
    }
    return this.cache.get(experimentID);
  }
  async _loadExperiments(experimentIDs) {
    try {
      const batchSize = 50;
      for (let i = 0; i < experimentIDs.length; i += batchSize) {
        const batch = experimentIDs.slice(i, i + batchSize);
        const response = await fetch(`${this.apiURL}/experiments/batch/list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': this.apiKey
          },
          body: JSON.stringify({
            ids: batch
          })
        });
        if (!response.ok) {
          throw new Error(`API request failed with status code: ${response.status}`);
        }
        const result = await response.json();
        for (const exp of result.success) {
          this.cache.set(exp.id, exp);
        }
      }
    } catch (error) {
      console.error('Error loading experiments:', error.message);
      throw error;
    }
  }
  _startCacheRefresh() {
    this.cacheRefreshInterval = setInterval(() => this._refreshCache(), 10 * 60 * 1000);
  }
  close() {
    if (this.cacheRefreshInterval) {
      clearInterval(this.cacheRefreshInterval);
      this.cacheRefreshInterval = null;
    }
    if (this.bufferFlushInterval) {
      clearInterval(this.bufferFlushInterval);
      this.bufferFlushInterval = null;
    }
    // Add any additional cleanup logic here if needed
  }
  async _refreshCache() {
    try {
      const cacheKeys = Array.from(this.cache.keys());
      await this._loadExperiments(cacheKeys);
    } catch (error) {
      console.error('Error refreshing experiments:', error.message);
    }
  }
  _calculateHash(input) {
    return md5(input);
  }
  _isInExposureBucket(hash, exposure) {
    const hashInt = parseInt(hash.substring(0, 8), 16);
    if (hashInt === 0xffffffff && exposure === 100) {
      return true;
    }
    if (hashInt === 0x00000000 && exposure === 0) {
      return false;
    }
    return hashInt / 0xffffffff < exposure / 100;
  }
  _determineTreatment(hash, treatmentAllocations) {
    const hashFloat = parseInt(hash.substring(0, 8), 16) / 0xffffffff;
    let cumulativeProbability = 0;
    for (const allocation of treatmentAllocations) {
      cumulativeProbability += allocation.allocation / 100;
      if (hashFloat < cumulativeProbability) {
        return allocation.id;
      }
    }
    return '';
  }
  async trackMetric({
    experimentID,
    stage,
    dimension,
    treatment,
    metricName,
    metricValue,
    aggregationType = AggregationTypes.SUM
  }) {
    if (!Treatments.isValid(treatment)) {
      throw new Error('Invalid treatment string');
    }
    if (!Stages.isValid(stage)) {
      throw new Error('Invalid stage string');
    }

    // Validate aggregation type
    if (!AggregationTypes.isValid(aggregationType)) {
      throw new Error(`Invalid aggregation type: ${aggregationType}`);
    }
    if (treatment === '') {
      return;
    }
    // Validate experiment, stage, and dimension
    const experiment = await this._getExperiment(experimentID);
    const stageData = experiment.stages.find(s => s.stage === stage);
    if (!stageData) {
      throw new Error(`Stage ${stage} not found for experiment ${experimentID}`);
    }
    const stageDimension = stageData.stageDimensions.find(sd => sd.dimension === dimension);
    if (!stageDimension) {
      throw new Error(`Dimension ${dimension} not found for stage ${stage} in experiment ${experimentID}`);
    }
    const treatmentData = experiment.treatments.find(t => t.id === treatment);
    if (!treatmentData) {
      throw new Error(`Treatment ${treatment} in experiment ${experimentID}`);
    }
    const key = `${experimentID}-${stage}-${dimension}-${treatment}-${metricName}-${aggregationType}`;

    // Initialize or aggregate metric in the buffer
    if (!this.buffer[key]) {
      this.buffer[key] = {
        sum: 0,
        count: 0,
        values: []
      };
    }
    if (aggregationType === AggregationTypes.SUM && metricValue < 0) {
      throw new Error(`Metric ${metricName} cannot be negative for AggregrationTypes.SUM`);
    }
    this.buffer[key].sum += metricValue;
    this.buffer[key].count += 1;

    // Track values for percentiles
    if (aggregationType === AggregationTypes.PERCENTILE) {
      this.buffer[key].values.push(metricValue); // Collect raw values for percentile calculation
    }
  }

  // Periodically flush metrics based on time (every minute)
  _startBufferFlush() {
    this.bufferFlushInterval = setInterval(() => {
      if (Object.keys(this.buffer).length > 0) {
        this._flushMetrics();
      }
    }, this.flushInterval);
  }

  // Helper function to calculate percentiles
  _calculatePercentiles(values, percentiles) {
    if (values.length === 0) return {};
    values.sort((a, b) => a - b); // Sort values to calculate percentiles
    const results = {};
    percentiles.forEach(percentile => {
      const idx = Math.ceil(percentile / 100 * values.length) - 1;
      results[percentile] = values[idx];
    });
    return results;
  }

  // Flush metrics to the backend server
  async _flushMetrics() {
    const metricsBatch = Object.entries(this.buffer).map(([key, value]) => {
      const [experimentID, stage, dimension, treatment, metricName, aggregationType] = key.split('-');
      let metricValue;
      if (aggregationType === AggregationTypes.AVERAGE) {
        metricValue = value.sum / value.count; // Calculate the average
      } else if (aggregationType === AggregationTypes.PERCENTILE) {
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
      } else {
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
    for (let i = 0; i < metricsBatch.length; i += batchSize) {
      batches.push(metricsBatch.slice(i, i + batchSize));
    }

    // Send batches in parallel
    try {
      await Promise.all(batches.map(async batch => {
        try {
          const response = await fetch(`${this.apiURL}/metrics/track/batch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': this.apiKey
            },
            body: JSON.stringify({
              metrics: batch
            })
          });
          if (!response.ok) {
            throw new Error(`API request failed with status code: ${response.status}`);
          }
        } catch (error) {
          console.error('Error sending metrics batch:', error.message);
        }
      }));
      this.buffer = {}; // Clear buffer after sending
    } catch (error) {
      console.error('Error sending metrics batches:', error.message);
    }
  }

  // New public method to manually trigger metrics flush
  async flush() {
    await this._flushMetrics();
  }

  // New method to get segment information
  async getSegment(options = {}) {
    try {
      const response = await fetch(`${this.apiURL}/segment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          ip: options.ip,
          userAgent: options.userAgent
        })
      });
      if (!response.ok) {
        throw new Error(`API request failed with status code: ${response.status}`);
      }
      const result = await response.json();

      // Create and return a new Segment object
      return Segment.fromJSON(result);
    } catch (error) {
      console.error('Error getting segment:', error.message);
      throw error;
    }
  }

  // New wrapper function for getTreatment using Segment
  async getTreatmentWithSegment(experimentID, stage, segment, allocationKey) {
    const exp = await this._getExperiment(experimentID);
    const dimension = this._getDimensionFromSegment(exp, stage, segment);
    if (dimension === '') {
      return '';
    }
    return this.getTreatment(experimentID, stage, dimension, allocationKey);
  }

  // New wrapper function for trackMetric using Segment
  async trackMetricWithSegment({
    experimentID,
    stage,
    segment,
    treatment,
    metricName,
    metricValue,
    aggregationType = AggregationTypes.SUM
  }) {
    const exp = await this._getExperiment(experimentID);
    const dimension = this._getDimensionFromSegment(exp, stage, segment);
    if (dimension === '') {
      return;
    }
    return this.trackMetric({
      experimentID,
      stage,
      dimension,
      treatment,
      metricName,
      metricValue,
      aggregationType
    });
  }

  // Helper function to determine the appropriate dimension based on the experiment, stage, and segment
  _getDimensionFromSegment(experiment, stage, segment) {
    const stageData = experiment.stages.find(s => s.stage === stage);
    if (!stageData) {
      throw new Error(`Stage ${stage} not found for experiment ${experiment.id}`);
    }
    const dimensions = stageData.stageDimensions.filter(sd => sd.enabled).map(sd => sd.dimension);

    // Check for exact matches
    const exactMatches = [`${segment.countryCode}-${segment.deviceType}`, `${segment.countryCode}-all`, `${segment.region}-${segment.deviceType}`, `${segment.region}-all`, `GLO-${segment.deviceType}`, 'GLO-all'];
    for (const match of exactMatches) {
      if (dimensions.includes(match)) {
        return match;
      }
    }

    // If no match found, return empty string
    return '';
  }
}
module.exports = {
  SimpleABSDK,
  BaseAPIUrls,
  AggregationTypes,
  Treatments,
  Stages,
  Segment
};

/***/ }),

/***/ 335:
/***/ ((module) => {

module.exports = require("cross-fetch");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(987);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;