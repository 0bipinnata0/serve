export type VisitDataType = {
  x: string;
  y: number;
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

export type TableBasicP = {
  value: {
    key: string;
    id: string;
    location: string;
    user: string;
    spend_time: string;
    status: string;
    create_time: string;
  }[];
};
