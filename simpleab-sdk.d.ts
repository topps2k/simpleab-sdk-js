declare namespace SimpleABSDK
{
  export class BaseAPIUrls
  {
    static readonly CAPTCHIFY_NA: string;
  }

  export class FlushIntervals
  {
    static readonly ONE_MINUTE: number;
    static isValid(type: number): boolean;
  }

  export class AggregationTypes
  {
    static readonly SUM: string;
    static readonly AVERAGE: string;
    static readonly PERCENTILE: string;
    static isValid(type: string): boolean;
  }

  export class Treatments
  {
    static readonly NONE: string;
    static readonly CONTROL: string;
    static readonly TREATMENTS: string[];
    static isValid(type: string): boolean;
  }

  export class Stages
  {
    static readonly BETA: string;
    static readonly PROD: string;
    static isValid(type: string): boolean;
  }

  export class Segment
  {
    countryCode: string;
    region: string;
    deviceType: string;

    constructor(countryCode: string, region: string, deviceType: string);
    static fromJSON(json: { countryCode: string; region: string; deviceType: string }): Segment;
    toJSON(): { countryCode: string; region: string; deviceType: string };
  }

  export interface TreatmentAllocation
  {
    id: string;
    allocation: number;
  }

  export interface StageDimension
  {
    dimension: string;
    enabled: boolean;
    exposure: number;
    treatmentAllocations: TreatmentAllocation[];
  }

  export interface Stage
  {
    stage: string;
    stageDimensions: StageDimension[];
  }

  export interface StageOverride
  {
    stage: string;
    enabled: boolean;
    dimensions: string[];
    treatment: string;
  }

  export interface Override
  {
    allocationKey: string;
    stageOverrides: StageOverride[];
  }

  export interface Experiment
  {
    id: string;
    allocationRandomizationToken: string;
    exposureRandomizationToken: string;
    stages: Stage[];
    overrides?: Override[];
    treatments: { id: string }[];
  }

  export interface TrackMetricParams
  {
    experimentID: string;
    stage: string;
    dimension: string;
    treatment: string;
    metricName: string;
    metricValue: number;
    aggregationType?: string;
  }

  export interface GetSegmentOptions
  {
    ip?: string;
    userAgent?: string;
  }

  export class SimpleABSDK
  {
    constructor(apiURL: string, apiKey: string, experiments?: string[]);
    getTreatment(experimentID: string, stage: string, dimension: string, allocationKey: string): Promise<string>;
    trackMetric(params: TrackMetricParams): Promise<void>;
    close(): void;
    flush(): Promise<void>;
    getSegment(options?: GetSegmentOptions): Promise<Segment>;

    private _checkForOverride(experiment: Experiment, stage: string, dimension: string, allocationKey: string): string | null;
    private _getExperiment(experimentID: string): Promise<Experiment>;
    private _loadExperiments(experimentIDs: string[]): Promise<void>;
    private _startCacheRefresh(): void;
    private _refreshCache(): Promise<void>;
    private _calculateHash(input: string): string;
    private _isInExposureBucket(hash: string, exposure: number): boolean;
    private _determineTreatment(hash: string, treatmentAllocations: TreatmentAllocation[]): string;
    private _startBufferFlush(): void;
    private _calculatePercentiles(values: number[], percentiles: number[]): { [key: number]: number };
    private _flushMetrics(): Promise<void>;

    private readonly apiURL: string;
    private readonly apiKey: string;
    private readonly experiments: string[];
    private readonly cache: Map<string, Experiment>;
    private cacheRefreshInterval: NodeJS.Timeout | null;
    private buffer: { [key: string]: { sum: number; count: number; values: number[] } };
    private readonly flushInterval: number;
    private bufferFlushInterval: NodeJS.Timeout | null;
  }
}

export = SimpleABSDK;
export as namespace SimpleABSDK;