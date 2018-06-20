import { fakeChartData } from '../services/api';

export default {
  namespace: 'test',
  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      console.log(response); // eslint-disable-line
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
  },
};
