import { queryCurrent } from '@/services/user';
import type { Reducer, Effect } from 'umi';
import type { CurrentUser } from './data.d';

export type ModalState = {
  currentUser: Partial<CurrentUser>;
};

export type ModelType = {
  namespace: string;
  state: ModalState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModalState>;
  };
};

const Model: ModelType = {
  namespace: 'accountCenter',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...(state as ModalState),
        currentUser: action.payload || {},
      };
    },
  },
};

export default Model;
