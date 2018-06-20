export const REQUEST_TODO = 'REQUEST_TODO';
export const RESPONSE_TODO = 'RESPONSE_TODO';

const request = count => ({ type: REQUEST_TODO, payload: { loading: true, count } });

const response = count => ({ type: RESPONSE_TODO, payload: { loading: false, count } });

export const fetch = count => {
  return dispatch => {
    dispatch(request(count));

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(count + 1);
      }, 1000);
    }).then(data => {
      dispatch(response(data));
    });
  };
};
