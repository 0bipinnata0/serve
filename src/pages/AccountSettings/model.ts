import { queryCurrent } from '@/services/user';
import type { Effect, Reducer } from 'umi';
import type { CurrentUser } from './data.d';

export type ModalState = {
  currentUser?: Partial<CurrentUser>;
  isLoading?: boolean;
};

export type ModelType = {
  namespace: string;
  state: ModalState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModalState>;
    changeLoading: Reducer<ModalState>;
  };
};

const Model: ModelType = {
  namespace: 'accountSettings',

  state: {
    currentUser: {},
    isLoading: false,
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
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
};

export default Model;
