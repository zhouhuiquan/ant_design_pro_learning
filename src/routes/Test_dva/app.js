import React from 'react';
import { connect } from 'dva';

const App = ({ fetch, count, loading }) => {
  return (
    <div>
      {loading ? <div>loading...</div> : <div>{count}</div>}
      <button onClick={() => fetch(count)}>add</button>
    </div>
  );
};

function mapStateToProps(state) {
  return state.demo;
}

function mapDispatchToProps(dispatch) {
  return {
    fetch(count) {
      dispatch({ type: 'demo/fetch', count });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
