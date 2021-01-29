import { fake_tasks } from '@/services/task';
import type { Effect, Reducer } from 'umi';
import type { TableBasicP } from '.';

export type ModelType = {
  namespace: string;
  state: TableBasicP;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<TableBasicP>;
    clear: Reducer<TableBasicP>;
  };
};

const initState = {
  value: [],
};

const Model: ModelType = {
  namespace: 'tableBasic',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fake_tasks);
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
