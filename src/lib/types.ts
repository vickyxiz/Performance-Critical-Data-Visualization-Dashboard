export type DataPoint = {
  timestamp: number;
  value: number;
  value2: number;
  category: string;
};

export type AggregationLevel = 'none' | '1s' | '5s' | '1m';

export type ChartType = 'line' | 'bar' | 'scatter';
