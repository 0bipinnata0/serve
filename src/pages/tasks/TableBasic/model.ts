import type { TableBasicP } from './data.d';
import { deleteNode, fake_tasks } from '@/services/task';
import type { Effect, Reducer } from 'umi';

export type ModelType = {
  namespace: string;
  state: TableBasicP;
  effects: {
    fetch: Effect;
    deleteSync: Effect;
  };
  reducers: {
    save: Reducer<TableBasicP>;
    clear: Reducer<TableBasicP>;
    delete: Reducer<TableBasicP>;
  };
};

const initState = {
  data: [],
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
    *deleteSync({ payload }, { call, put }) {
      const response = yield call(deleteNode, payload);
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
    delete(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
