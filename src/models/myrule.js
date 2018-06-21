import moment from 'moment'

import { getLog, getLogState } from '../services/api'

export default {
  namespace: 'myrule',
  state: {
    data: [],
    pagination: {},
    stateList: []
  },
  effects: {
    *state (_, { call, put} ) {
      const response = yield call(getLogState)
      response.unshift({value: -1, label: '全部结果'})
      yield put({
        type: 'savestate',
        payload: response,
      })
    },
    *log({ payload }, { call, put }) {
      const response = yield call(getLog, payload)
      response.data.forEach(item => {
        item.result = item.result === 0 ? '登录失败' : '登录成功'
        item.time = moment(item.time, 'x').format('LLL')
      })
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    savestate(state, action) {
      return {
        ...state,
        stateList: action.payload
      }
    },
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
