import moment from 'moment'

import { getOrganization, getLogState, getAuditLog } from '../services/api' 

export default {
  namespace: 'auditLog',
  state: {
    data: {
      list: [],
      pagination: {
        pageSie: 10,
        current: 1,
      },
    },
    stateList: [],
    organizationList: [],
    stateList: [],
  },
  effects: {
    *organization(_ , { call, put }) {
      const response = yield call(getOrganization)
      yield put({
        type: 'saveOrganization',
        payload: response
      })
    },
    *state(_, { call, put }) {
      let response = yield call(getLogState)
      response.unshift({
        value: -1,
        label: '全部结果'
      })
      yield put({
        type: 'saveState',
        payload: response
      })
    },
    *log({ payload }, { call, put }) {
      let response = yield call(getAuditLog, payload)
      response.data.list.forEach(item => {
        item.result = item.result === 0 ? '登录失败' : '登录成功'
        item.time = moment(item.time).format('lll')
      })
      yield put({
        type: 'save',
        payload: response.data,
      })
    }
  },

  reducers: {
    saveOrganization(state, action) {
      return {
        ...state,
        organizationList: action.payload.data
      }
    },
    saveState(state, action) {
      return {
        ...state,
        stateList: action.payload
      }
    },
    save(state, action) {
      return {
        ...state,
        data: {...action.payload}
      }
    }
  }
}