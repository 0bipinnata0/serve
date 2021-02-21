import { queryCurrent } from '@/services/user';
import type { Reducer, Effect } from 'umi';
import type { CurrentUser } from '../AccountSettings/data';

export type ModalState = {
  userInfo?: Partial<CurrentUser>;
  isLoading?: boolean;
};

export type ModelType = {
  namespace: string;
  state: ModalState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ModalState>;
    clear: Reducer<ModalState>;
  };
};

const initState = {
  userInfo: {},
  isLoading: false,
};

const Model: ModelType = {
  namespace: 'accountCenter',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'save',
        payload: { userInfo: response },
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
