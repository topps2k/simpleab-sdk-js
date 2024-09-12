declare module 'simpleab-sdk' {
  import { AxiosInstance } from 'axios';

  /**
   * Base API URLs for different regions.
   */
  export class BaseAPIUrls
  {
    static readonly CAPTCHIFY_NA: string;
  }

  /**
   * Flush intervals for metric tracking.
   */
  export class FlushIntervals
  {
    static readonly ONE_MINUTE: number;
    static isValid(type: number): boolean;
  }

  /**
   * Aggregation types for metric tracking.
   */
  export class AggregationTypes
  {
    static readonly SUM: string;
    static readonly AVERAGE: string;
    static readonly PERCENTILE: string;
    static isValid(type: string): boolean;
  }

  /**
   * Treatment types.
   */
  export class Treatments
  {
    static readonly NONE: string;
    static readonly CONTROL: string;
    static readonly TREATMENTS: string[];
    static isValid(type: string): boolean;
  }

  /**
   * Experimental stages.
   */
  export class Stages
  {
    static readonly BETA: string;
    static readonly PROD: string;
    static isValid(type: string): boolean;
  }

  interface TreatmentAllocation
  {
    id: string;
    allocation: number;
  }

  interface StageDimension
  {
    dimension: string;
    enabled: boolean;
    exposure: number;
    treatmentAllocations: TreatmentAllocation[];
  }

  interface Stage
  {
    stage: string;
    stageDimensions: StageDimension[];
  }

  interface StageOverride
  {
    stage: string;
    enabled: boolean;
    dimensions: string[];
    treatment: string;
  }

  interface Override
  {
    allocationKey: string;
    stageOverrides: StageOverride[];
  }

  interface Treatment
  {
    id: string;
    // Add other properties if needed
  }

  interface Experiment
  {
    id: string;
    allocationRandomizationToken: string;
    exposureRandomizationToken: string;
    stages: Stage[];
    overrides?: Override[];
    treatments: Treatment[];
  }

  interface TrackMetricParams
  {
    experimentID: string;
    stage: string;
    dimension: string;
    treatment: string;
    metricName: string;
    metricValue: number;
    aggregationType?: string;
  }

  /**
   * Main SDK class for SimpleAB integration.
   */
  export class SimpleABSDK
  {
    constructor(apiURL: string, apiKey: string, experiments?: string[], flushInterval?: number);

    getTreatment(experimentID: string, stage: string, dimension: string, allocationKey: string): Promise<string>;
    trackMetric(params: TrackMetricParams): Promise<void>;
    close(): void;

    private _getExperiment(experimentID: string): Promise<Experiment>;
    private _loadExperiments(experimentIDs: string[]): Promise<void>;
    private _startCacheRefresh(): void;
    private _refreshCache(): Promise<void>;
    private _calculateHash(input: string): string;
    private _isInExposureBucket(hash: string, exposure: number): boolean;
    private _determineTreatment(hash: string, treatmentAllocations: TreatmentAllocation[]): string;
    private _checkForOverride(experiment: Experiment, stage: string, dimension: string, allocationKey: string): string | null;
    private _startBufferFlush(): void;
    private _flushMetrics(): Promise<void>;
    private _calculatePercentiles(values: number[], percentiles: number[]): { [key: number]: number };

    private readonly apiURL: string;
    private readonly apiKey: string;
    private readonly experiments: string[];
    private readonly cache: Map<string, Experiment>;
    private readonly client: AxiosInstance;
    private cacheRefreshInterval: NodeJS.Timeout | null;
    private buffer: { [key: string]: { sum: number, count: number, values: number[] } };
    private readonly flushInterval: number;
    private bufferFlushInterval: NodeJS.Timeout | null;
  }
}