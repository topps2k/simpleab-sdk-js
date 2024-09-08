const { SimpleABSDK } = require('./simpleab-sdk');
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
});