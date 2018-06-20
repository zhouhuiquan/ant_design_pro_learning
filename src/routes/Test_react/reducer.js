import { REQUEST_TODO, RESPONSE_TODO } from './actions';

export default (
  state = {
    loading: false,
    count: 0,
  },
  action
) => {
  switch (action.type) {
    case REQUEST_TODO:
      return { ...state, ...action.payload };
    case RESPONSE_TODO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
