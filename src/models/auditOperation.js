import moment from 'moment'

import { getAuditOperation, getOperationList, getOrganization } from '../services/api'

export default {
  namespace: 'auditOperation',
  state: {
    data: {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 55,
      }
    },
    operationList: [],
  },

  effects: {
    *search({ payload }, { call, put }) {
      let response = yield call(getAuditOperation, payload)
      let operationList = yield call(getOperationList)
      let organizationList = yield call(getOrganization)
      let olists = []
      organizationList.data.forEach(item => {
        item.children.forEach(sub => {
          olists.push(sub)
        })
      })
      response.data.list.forEach(item => {
        operationList.data.forEach(sub => {
          if (sub.id === item.operation) {
            item.operation = sub.label
          }
        })
        olists.forEach(sub => {
          if (sub.value === item.organization) {
            item.organization = sub.label
          }
        })
        item.time = moment(item.time, 'x').format('lll')
      })
      yield put({
        type: 'saveSearch',
        payload: response.data
      })
    },
    *operation(_, { call, put }) {
      let response = yield call(getOperationList)
      response.data.unshift({
        id: -1,
        label: '全部'
      })
      yield put({
        type: 'saveOperation',
        payload: response.data
      })
    }
  },
  
  reducers: {
    saveOperation(state, action) {
      return {
        ...state,
        operationList: [...action.payload]
      }
    },
    saveSearch(state, action) {
      return {
        ...state,
        data: {...action.payload}
      }
    },
  }

}