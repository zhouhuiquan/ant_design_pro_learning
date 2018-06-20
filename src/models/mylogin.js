import { routerRedux } from 'dva/router';

export default {
  namespace: 'mylogin',

  state: {
    status: undefined,
  },

  effects: {
    *login(_, { put }) {
      yield put(routerRedux.push('/'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
