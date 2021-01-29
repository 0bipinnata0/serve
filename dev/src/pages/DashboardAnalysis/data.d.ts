export type VisitDataType = {
  x: string;
  y: number;
};

export type CardType = {
  key: string;
  name: string;
  number: number;
};
export type SearchDataType = {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
};

export type OfflineDataType = {
  name: string;
  cvr: number;
};

export type OfflineChartData = {
  x: any;
  y1: number;
  y2: number;
};

export type RadarData = {
  name: string;
  label: string;
  value: number;
};

export type AnalysisData = {
  availableTime: VisitDataType[];
  storage: VisitDataType[];
  nodes: VisitDataType[];
  cores: VisitDataType[];
};
