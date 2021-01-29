import { fake_statistics } from '@/services/statistics';
import type { Effect, Reducer } from 'umi';
import type { StatisticsType } from './data';

export type ModelType = {
  namespace: string;
  state: StatisticsType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<StatisticsType>;
    clear: Reducer<StatisticsType>;
  };
};

const initState = {
  data: [],
};

const Model: ModelType = {
  namespace: 'statistics',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fake_statistics);
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
