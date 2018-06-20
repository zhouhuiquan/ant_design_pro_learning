export default {
  namespace: 'myrule',
  state: {
    data: {
      list: [
        {
          id: 5,
          time: '2018-06-08 10:11:10',
          ip: '222.222.222.222',
          result: '登录成功',
        },
        {
          id: 4,
          time: '2018-06-08 10:11:10',
          ip: '222.222.222.222',
          result: '登录失败',
        },
        {
          id: 3,
          time: '2018-06-08 10:11:10',
          ip: '222.222.222.222',
          result: '登录失败',
        },
        {
          id: 2,
          time: '2018-06-08 10:11:10',
          ip: '222.222.222.222',
          result: '登录失败',
        },
        {
          id: 1,
          time: '2018-06-08 10:11:10',
          ip: '222.222.222.222',
          result: '登录失败',
        },
      ],
      pagination: {},
    },
  },
  effects: {
    *log({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          list: [
            {
              id: 7,
              time: '2018-06-08 10:11:10',
              ip: '222.222.222.222',
              result: '登录成功',
            },
            {
              id: 6,
              time: '2018-06-08 10:11:10',
              ip: '222.222.222.222',
              result: '登录成功',
            },
            {
              id: 5,
              time: '2018-06-08 10:11:10',
              ip: '222.222.222.222',
              result: '登录成功',
            },
            {
              id: 4,
              time: '2018-06-08 10:11:10',
              ip: '222.222.222.222',
              result: '登录失败',
            },
            {
              id: 3,
              time: '2018-06-08 10:11:10',
              ip: '222.222.222.222',
              result: '登录失败',
            },
            {
              id: 2,
              time: '2018-06-08 10:11:10',
              ip: '222.222.222.222',
              result: '登录失败',
            },
            {
              id: 1,
              time: '2018-06-08 10:11:10',
              ip: '222.222.222.222',
              result: '登录失败',
            },
          ],
          ...payload,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
