declare module 'simpleab-sdk' {
  import { AxiosInstance } from 'axios';

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

  interface Experiment
  {
    id: string;
    allocationRandomizationToken: string;
    exposureRandomizationToken: string;
    stages: Stage[];
    overrides?: Override[];
  }

  class BaseAPIUrls
  {
    static CAPTCHIFY_NA: string;
  }

  class SimpleABSDK
  {
    constructor(apiURL: string, apiKey: string, experiments?: string[]);

    getTreatment(experimentID: string, stage: string, dimension: string, allocationKey: string): Promise<string>;
    close(): void;

    private _getExperiment(experimentID: string): Promise<Experiment>;
    private _loadExperiments(experimentIDs: string[]): Promise<void>;
    private _startCacheRefresh(): void;
    private _refreshCache(): Promise<void>;
    private _calculateHash(input: string): string;
    private _isInExposureBucket(hash: string, exposure: number): boolean;
    private _determineTreatment(hash: string, treatmentAllocations: TreatmentAllocation[]): string;
    private _checkForOverride(experiment: Experiment, stage: string, dimension: string, allocationKey: string): string | null;

    private apiURL: string;
    private apiKey: string;
    private experiments: string[];
    private cache: Map<string, Experiment>;
    private client: AxiosInstance;
    private cacheRefreshInterval: NodeJS.Timeout | null;
  }

  export { SimpleABSDK, BaseAPIUrls };
}