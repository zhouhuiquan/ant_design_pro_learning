import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';

const App = ({ fetch, count, loading }) => {
  return (
    <div>
      {loading ? <div>loading...</div> : <div>{count}</div>}
      <button onClick={() => fetch(count)}>add</button>
    </div>
  );
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
