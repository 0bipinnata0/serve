import { Request, Response } from 'express';

const availableTime = [
  { x: 'Total', y: 1000 },
  { x: 'Used', y: 500 },
  { x: 'Left', y: 500 },
];

const storage = [
  { x: 'Total', y: 1000 },
  { x: 'Used', y: 770 },
  { x: 'Left', y: 230 },
];

const nodes = [
  {
    x: 'running',
    y: 2,
  },
  {
    x: 'free',
    y: 2,
  },
];

const cores = [
  {
    x: 'running',
    y: 2,
  },
  {
    x: 'free',
    y: 2,
  },
];

const getFakeChartData = (req: Request, res: Response) => {
  res.json({
    availableTime,
    storage,
    nodes,
    cores,
  });
};

export default {
  'GET  /api/fake_chart_data': getFakeChartData,
};
