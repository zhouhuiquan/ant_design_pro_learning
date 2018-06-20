import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.time('abc'); // eslint-disable-line
      console.log('这是登录所携带的账号密码', payload); // eslint-disable-line
      const response = yield call(fakeAccountLogin, payload);
      console.timeEnd('abc'); // eslint-disable-line
      console.log('这是返回后的的信息', response); // eslint-disable-line
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        console.log(response.status); // eslint-disable-line
        yield put(routerRedux.push('/'));
      } else {
        console.log('登录失败'); // eslint-disable-line
      }
    },
    *logouter(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        console.log('改变登录状态'); // eslint-disable-line
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        console.log('跳转到登录页面'); // eslint-disable-line
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
