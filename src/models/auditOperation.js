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
    search: [function*({ payload }, { call, put, select, take }) {
      let response = yield call(getAuditOperation, payload)
      // let organizationList = yield call(getOrganization)
      // organizationList = organizationList.data
      let organizationList = yield select(state => state.auditLog.organizationList)
      // debugger
      organizationList = organizationList.reduce((pre, cur) => {
        return [...pre, ...cur.children]
      }, [])
      let organizationObject = organizationList.reduce((pre, cur) => {
        pre[cur.value] = cur.label
        return pre
      }, {})
      let operationList = yield select(state => state.auditOperation.operationList)
      let operationObject = operationList.reduce((pre, cur) => {
        pre[cur.id] = cur.label
        return pre
      }, {})
      response.data.list.forEach(item => {
        item.organization = organizationObject[item.organization]
        item.operation = operationObject[item.operation]
        item.time = moment(item.time, 'x').format('lll')
      })
      yield put({
        type: 'saveSearch',
        payload: response.data
      })
    }, { type: 'throttle', ms: 200 },],
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
      // let operationList = state.operationList.reduce((pre, cur) => {
      //   pre[cur.id] = cur.label
      //   return pre
      // })
      // action.payload.list.forEach(item =>{
      //   item.operation = operationList[item.operation]
      // })
      return {
        ...state,
        data: {...action.payload}
      }
    },
  }

}