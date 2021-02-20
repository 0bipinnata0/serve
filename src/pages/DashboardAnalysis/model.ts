import type { Effect, Reducer } from 'umi';
import type { AnalysisData } from './data.d';
import { fakeChartData } from './service';

export type ModelType = {
  namespace: string;
  state: AnalysisData;
  effects: {
    fetch: Effect;
    fetchSalesData?: Effect;
  };
  reducers: {
    save: Reducer<AnalysisData>;
    clear: Reducer<AnalysisData>;
  };
};

const initState = {
  availableTime: [],
  storage: [],
  nodes: [],
  cores: [],
};

const Model: ModelType = {
  namespace: 'dashboardAnalysis',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
