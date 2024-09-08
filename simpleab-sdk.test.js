const { SimpleABSDK, AggregationTypes, Treatments } = require('./simpleab-sdk');
const axios = require('axios');

jest.mock('axios');

describe('SimpleABSDK', () =>
{
  let sdk;
  const mockApiURL = 'https://api.example.com';
  const mockApiKey = 'test-api-key';
  const mockAxiosInstance = {
    post: jest.fn()
  };

  beforeEach(() =>
  {
    jest.clearAllMocks();
    axios.create.mockReturnValue(mockAxiosInstance);
    jest.useFakeTimers();
  });

  afterEach(() =>
  {
    jest.useRealTimers();
    if (sdk)
    {
      sdk.close();
    }
  });

  describe('constructor', () =>
  {
    it('should initialize with correct properties', () =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
      expect(sdk.apiURL).toBe(mockApiURL);
      expect(sdk.apiKey).toBe(mockApiKey);
      expect(sdk.experiments).toEqual([]);
      expect(sdk.cache).toBeInstanceOf(Map);
      sdk.close();
    });

    it('should create axios instance with correct config', () =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: mockApiURL,
        timeout: 10000,
        headers: { 'X-API-Key': mockApiKey }
      });
      sdk.close();
    });
  });

  describe('getTreatment', () =>
  {
    beforeEach(() =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
    });

    it('should return correct treatment', async () =>
    {
      const mockExperiment = {
        id: 'exp1',
        allocationRandomizationToken: 'alloc-token',
        exposureRandomizationToken: 'exposure-token',
        stages: [
          {
            stage: 'stage1',
            stageDimensions: [
              {
                dimension: 'dim1',
                enabled: true,
                exposure: 0.5,
                treatmentAllocations: [
                  { id: 'treatment1', allocation: 0.5 },
                  { id: 'treatment2', allocation: 0.5 }
                ]
              }
            ]
          }
        ]
      };

      sdk._getExperiment = jest.fn().mockResolvedValue(mockExperiment);
      sdk._isInExposureBucket = jest.fn().mockReturnValue(true);
      sdk._determineTreatment = jest.fn().mockReturnValue('treatment1');

      const result = await sdk.getTreatment('exp1', 'stage1', 'user1', 'dim1');
      expect(result).toBe('treatment1');
      sdk.close();
    });

    it('should return empty string when stage not found', async () =>
    {
      const mockExperiment = {
        id: 'exp1',
        stages: []
      };

      sdk._getExperiment = jest.fn().mockResolvedValue(mockExperiment);

      const result = await sdk.getTreatment('exp1', 'stage1', 'user1', 'dim1');
      expect(result).toBe('');
      sdk.close();
    });
  });

  describe('_getExperiment', () =>
  {
    beforeEach(() =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
    });

    it('should return cached experiment if available', async () =>
    {
      const mockExperiment = { id: 'exp1' };
      sdk.cache.set('exp1', mockExperiment);

      const result = await sdk._getExperiment('exp1');
      expect(result).toEqual(mockExperiment);
      sdk.close();
    });

    it('should load experiment if not in cache', async () =>
    {
      const mockExperiment = { id: 'exp1' };
      sdk._loadExperiments = jest.fn().mockImplementation(() =>
      {
        sdk.cache.set('exp1', mockExperiment);
      });

      const result = await sdk._getExperiment('exp1');
      expect(result).toEqual(mockExperiment);
      expect(sdk._loadExperiments).toHaveBeenCalledWith(['exp1']);
      sdk.close();
    });

    it('should return override treatment when applicable', async () =>
    {
      const mockExperiment = {
        id: 'exp1',
        allocationRandomizationToken: 'alloc-token',
        exposureRandomizationToken: 'exposure-token',
        stages: [
          {
            stage: 'stage1',
            stageDimensions: [
              {
                dimension: 'dim1',
                enabled: true,
                exposure: 0.5,
                treatmentAllocations: [
                  { id: 'treatment1', allocation: 0.5 },
                  { id: 'treatment2', allocation: 0.5 }
                ]
              }
            ]
          }
        ],
        overrides: [
          {
            allocationKey: 'user1',
            stageOverrides: [
              {
                stage: 'stage1',
                enabled: true,
                treatment: 'override_treatment',
                dimensions: ['dim1']
              }
            ]
          }
        ]
      };

      sdk._getExperiment = jest.fn().mockResolvedValue(mockExperiment);

      const result = await sdk.getTreatment('exp1', 'stage1', 'user1', 'dim1');
      expect(result).toBe('override_treatment');
      sdk.close();
    });

    it('should not apply override when dimensions do not match', async () =>
    {
      const mockExperiment = {
        id: 'exp1',
        allocationRandomizationToken: 'alloc-token',
        exposureRandomizationToken: 'exposure-token',
        stages: [
          {
            stage: 'stage1',
            stageDimensions: [
              {
                dimension: 'dim1',
                enabled: true,
                exposure: 0.5,
                treatmentAllocations: [
                  { id: 'treatment1', allocation: 0.5 },
                  { id: 'treatment2', allocation: 0.5 }
                ]
              }
            ]
          }
        ],
        overrides: [
          {
            allocationKey: 'user1',
            stageOverrides: [
              {
                stage: 'stage1',
                enabled: true,
                treatment: 'override_treatment',
                dimensions: ['dim2']
              }
            ]
          }
        ]
      };

      sdk._getExperiment = jest.fn().mockResolvedValue(mockExperiment);
      sdk._isInExposureBucket = jest.fn().mockReturnValue(true);
      sdk._determineTreatment = jest.fn().mockReturnValue('treatment1');

      const result = await sdk.getTreatment('exp1', 'stage1', 'user1', 'dim1');
      expect(result).toBe('treatment1');
      sdk.close();
    });

  });

  describe('_loadExperiments', () =>
  {
    beforeEach(() =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
    });

    it('should load experiments in batches of 50', async () =>
    {
      const mockExperiments = Array.from({ length: 120 }, (_, i) => ({ id: `exp${i + 1}`, name: `Experiment ${i + 1}` }));
      const mockResponses = [
        { status: 200, data: { success: mockExperiments.slice(0, 50) } },
        { status: 200, data: { success: mockExperiments.slice(50, 100) } },
        { status: 200, data: { success: mockExperiments.slice(100) } }
      ];

      mockAxiosInstance.post.mockImplementation(() => Promise.resolve(mockResponses.shift()));

      await sdk._loadExperiments(mockExperiments.map(exp => exp.id));

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(3);
      expect(mockAxiosInstance.post.mock.calls[0][1].ids).toHaveLength(50);
      expect(mockAxiosInstance.post.mock.calls[1][1].ids).toHaveLength(50);
      expect(mockAxiosInstance.post.mock.calls[2][1].ids).toHaveLength(20);

      mockExperiments.forEach(exp =>
      {
        expect(sdk.cache.get(exp.id)).toEqual(exp);
      });
      sdk.close();
    });

    it('should handle API errors for individual batches', async () =>
    {
      const mockExperiments = Array.from({ length: 70 }, (_, i) => ({ id: `exp${i + 1}`, name: `Experiment ${i + 1}` }));
      const mockResponses = [
        { status: 200, data: { success: mockExperiments.slice(0, 50) } },
        Promise.reject(new Error('API error for second batch'))
      ];

      mockAxiosInstance.post.mockImplementation(() => mockResponses.shift());

      await expect(sdk._loadExperiments(mockExperiments.map(exp => exp.id))).rejects.toThrow('API error for second batch');

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(2);
      expect(mockAxiosInstance.post.mock.calls[0][1].ids).toHaveLength(50);
      expect(mockAxiosInstance.post.mock.calls[1][1].ids).toHaveLength(20);

      mockExperiments.slice(0, 50).forEach(exp =>
      {
        expect(sdk.cache.get(exp.id)).toEqual(exp);
      });
      mockExperiments.slice(50).forEach(exp =>
      {
        expect(sdk.cache.has(exp.id)).toBeFalsy();
      });
      sdk.close();
    });
  });

  describe('_refreshCache', () =>
  {
    beforeEach(() =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
    });

    it('should refresh all experiments in the cache', async () =>
    {
      const mockExperiments = Array.from({ length: 5 }, (_, i) => ({ id: `exp${i + 1}`, name: `Experiment ${i + 1}` }));
      mockExperiments.forEach(exp => sdk.cache.set(exp.id, exp));

      const updatedExperiments = mockExperiments.map(exp => ({ ...exp, updated: true }));
      const mockResponse = { status: 200, data: { success: updatedExperiments } };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      await sdk._refreshCache();

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post.mock.calls[0][1].ids).toEqual(mockExperiments.map(exp => exp.id));

      updatedExperiments.forEach(exp =>
      {
        expect(sdk.cache.get(exp.id)).toEqual(exp);
      });
      sdk.close();
    });

    it('should handle errors during cache refresh', async () =>
    {
      const mockExperiments = Array.from({ length: 5 }, (_, i) => ({ id: `exp${i + 1}`, name: `Experiment ${i + 1}` }));
      mockExperiments.forEach(exp => sdk.cache.set(exp.id, exp));

      mockAxiosInstance.post.mockRejectedValue(new Error('API error during refresh'));

      await sdk._refreshCache();

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post.mock.calls[0][1].ids).toEqual(mockExperiments.map(exp => exp.id));

      // Ensure the cache remains unchanged
      mockExperiments.forEach(exp =>
      {
        expect(sdk.cache.get(exp.id)).toEqual(exp);
      });
      sdk.close();
    });
  });

  describe('_calculateHash', () =>
  {
    beforeEach(() =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
    });

    it('should return correct MD5 hash', () =>
    {
      const input = 'test-input';
      const expectedHash = 'b5f7f2b3e491718deb69195be3284b1b';
      expect(sdk._calculateHash(input)).toBe(expectedHash);
      sdk.close();
    });
  });

  describe('_isInExposureBucket', () =>
  {
    beforeEach(() =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
    });

    it('should return true when hash is within exposure', () =>
    {
      const hash = '00000000'; // This will result in 0 when converted to float
      expect(sdk._isInExposureBucket(hash, 0.5)).toBe(true);
      sdk.close();
    });

    it('should return false when hash is outside exposure', () =>
    {
      const hash = 'ffffffff'; // This will result in 1 when converted to float
      expect(sdk._isInExposureBucket(hash, 0.5)).toBe(false);
      sdk.close();
    });
  });

  describe('_determineTreatment', () =>
  {
    beforeEach(() =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
    });

    it('should return correct treatment based on hash', () =>
    {
      const hash = '80000000'; // This will result in 0.5 when converted to float
      const treatmentAllocations = [
        { id: 'treatment1', allocation: 0.3 },
        { id: 'treatment2', allocation: 0.3 },
        { id: 'treatment3', allocation: 0.4 }
      ];
      expect(sdk._determineTreatment(hash, treatmentAllocations)).toBe('treatment2');
      sdk.close();
    });

    it('should return empty string when no treatment matches', () =>
    {
      const hash = 'ffffffff'; // This will result in 1 when converted to float
      const treatmentAllocations = [
        { id: 'treatment1', allocation: 0.5 },
        { id: 'treatment2', allocation: 0.4 }
      ];
      expect(sdk._determineTreatment(hash, treatmentAllocations)).toBe('');
      sdk.close();
    });
  });
  describe('trackMetric', () =>
  {
    beforeEach(() =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
      sdk._getExperiment = jest.fn().mockResolvedValue({
        id: 'exp1',
        stages: [
          {
            stage: 'stage1',
            stageDimensions: [
              {
                dimension: 'dim1',
                enabled: true
              }
            ]
          }
        ],
        treatments: [
          {
            id: 'C'
          }
        ]
      });
    });

    it('should track sum metric correctly', async () =>
    {
      await sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 10,
        aggregationType: AggregationTypes.SUM
      });

      expect(sdk.buffer).toHaveProperty('exp1-stage1-dim1-C-metric1-sum');
      expect(sdk.buffer['exp1-stage1-dim1-C-metric1-sum']).toEqual({
        sum: 10,
        count: 1,
        values: []
      });
    });

    it('should track average metric correctly', async () =>
    {
      await sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 10,
        aggregationType: AggregationTypes.AVERAGE
      });

      expect(sdk.buffer).toHaveProperty('exp1-stage1-dim1-C-metric1-average');
      expect(sdk.buffer['exp1-stage1-dim1-C-metric1-average']).toEqual({
        sum: 10,
        count: 1,
        values: []
      });
    });

    it('should track percentile metric correctly', async () =>
    {
      await sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 10,
        aggregationType: AggregationTypes.PERCENTILE
      });

      expect(sdk.buffer).toHaveProperty('exp1-stage1-dim1-C-metric1-percentile');
      expect(sdk.buffer['exp1-stage1-dim1-C-metric1-percentile']).toEqual({
        sum: 10,
        count: 1,
        values: [10]
      });
    });

    it('should throw an error for invalid aggregation type', async () =>
    {
      await expect(sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 10,
        aggregationType: 'invalid'
      })).rejects.toThrow('Invalid aggregation type: invalid');
    });

    it('should throw an error for invalid treatment', async () =>
    {
      await expect(sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: 'invalid_treatment',
        metricName: 'metric1',
        metricValue: 10
      })).rejects.toThrow('Invalid treatment string');
    });

    it('should throw an error for invalid experiment', async () =>
    {
      sdk._getExperiment = jest.fn().mockRejectedValue(new Error('Experiment not found'));

      await expect(sdk.trackMetric({
        experimentID: 'invalid',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 10
      })).rejects.toThrow('Experiment not found');
    });

    it('should throw an error for invalid stage', async () =>
    {
      await expect(sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'invalid',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 10
      })).rejects.toThrow('Stage invalid not found for experiment exp1');
    });

    it('should throw an error for invalid dimension', async () =>
    {
      await expect(sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'invalid',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 10
      })).rejects.toThrow('Dimension invalid not found for stage stage1 in experiment exp1');
    });

    // New test cases for additional coverage
    it('should handle empty treatment correctly', async () =>
    {
      await sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.NONE,
        metricName: 'metric1',
        metricValue: 10
      });

      expect(sdk.buffer).toEqual({});
    });

    it('should track multiple metrics correctly', async () =>
    {
      await sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 10
      });

      await sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric2',
        metricValue: 20,
        aggregationType: AggregationTypes.AVERAGE
      });

      expect(sdk.buffer).toHaveProperty('exp1-stage1-dim1-C-metric1-sum');
      expect(sdk.buffer).toHaveProperty('exp1-stage1-dim1-C-metric2-average');
    });

    it('should accumulate values for the same metric', async () =>
    {
      await sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 10
      });

      await sdk.trackMetric({
        experimentID: 'exp1',
        stage: 'stage1',
        dimension: 'dim1',
        treatment: Treatments.CONTROL,
        metricName: 'metric1',
        metricValue: 20
      });

      expect(sdk.buffer['exp1-stage1-dim1-C-metric1-sum']).toEqual({
        sum: 30,
        count: 2,
        values: []
      });
    });
  });

  describe('_flushMetrics', () =>
  {
    beforeEach(() =>
    {
      sdk = new SimpleABSDK(mockApiURL, mockApiKey);
    });

    it('should flush sum metrics correctly', async () =>
    {
      sdk.buffer = {
        'exp1-stage1-dim1-treatment1-metric1-sum': {
          sum: 30,
          count: 3,
          values: []
        }
      };

      await sdk._flushMetrics();

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/metrics/track/batch', {
        metrics: [{
          experimentID: 'exp1',
          stage: 'stage1',
          dimension: 'dim1',
          treatment: 'treatment1',
          metricName: 'metric1',
          aggregationType: 'sum',
          value: 30,
          count: 3
        }]
      });

      expect(sdk.buffer).toEqual({});
    });

    it('should flush average metrics correctly', async () =>
    {
      sdk.buffer = {
        'exp1-stage1-dim1-treatment1-metric1-average': {
          sum: 30,
          count: 3,
          values: []
        }
      };

      await sdk._flushMetrics();

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/metrics/track/batch', {
        metrics: [{
          experimentID: 'exp1',
          stage: 'stage1',
          dimension: 'dim1',
          treatment: 'treatment1',
          metricName: 'metric1',
          aggregationType: 'average',
          value: 10,
          count: 3
        }]
      });

      expect(sdk.buffer).toEqual({});
    });

    it('should flush percentile metrics correctly', async () =>
    {
      sdk.buffer = {
        'exp1-stage1-dim1-treatment1-metric1-percentile': {
          sum: 30,
          count: 3,
          values: [5, 10, 15]
        }
      };

      await sdk._flushMetrics();

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/metrics/track/batch', {
        metrics: [{
          experimentID: 'exp1',
          stage: 'stage1',
          dimension: 'dim1',
          treatment: 'treatment1',
          metricName: 'metric1',
          p50: 10,
          p90: 15,
          p99: 15,
          count: 3
        }]
      });

      expect(sdk.buffer).toEqual({});
    });

    it('should handle API errors during flush', async () =>
    {
      sdk.buffer = {
        'exp1-stage1-dim1-treatment1-metric1-sum': {
          sum: 30,
          count: 3,
          values: []
        }
      };

      mockAxiosInstance.post.mockRejectedValue(new Error('API error'));

      await sdk._flushMetrics();

      expect(mockAxiosInstance.post).toHaveBeenCalled();
      expect(sdk.buffer).toEqual({}); // Buffer should be cleared even if API call fails
    });
  });

});