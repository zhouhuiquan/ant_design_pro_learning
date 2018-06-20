export default {
  namespace: 'demo',
  state: {
    loading: false,
  },
  reducers: {
    request(state, payload) {
      return { ...state, ...payload };
    },
    response(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch(action, { put }) {
      yield put({ type: 'request', loading: true });

      // const count = yield call(count => {
      //   return new Promise(resolve => {
      //     setTimeout(() => {
      //       resolve(count + 1);
      //     }, 1000);
      //   });
      // }, action.count);

      yield put({
        type: 'response',
        loading: false,
      });
    },
  },
};
