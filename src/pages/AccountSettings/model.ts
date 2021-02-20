import { modifyUser, queryCurrent } from '@/services/user';
import type { Effect, Reducer } from 'umi';
import type { CurrentUser } from './data.d';

export type ModalState = {
  userInfo?: Partial<CurrentUser>;
  isLoading?: boolean;
};

export type ModelType = {
  namespace: string;
  state: ModalState;
  effects: {
    fetch: Effect;
    account: Effect;
    password: Effect;
    description: Effect;
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
  namespace: 'accountSettings',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'save',
        payload: { userInfo: response },
      });
    },
    *account({ account }, { call }) {
      yield call(modifyUser, 'username', account);
    },

    *password({ password }, { call }) {
      yield call(modifyUser, 'password', password);
    },

    *description({ description }, { call }) {
      yield console.log(description, call);
      // yield call(modifyUser, 'description', description);
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
