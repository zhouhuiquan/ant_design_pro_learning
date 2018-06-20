import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

import ImageWrapper from '../../components/ImageWrapper';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['test/fetch'],
}))
export default class Test extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'test/fetch',
    });
  }

  render() {
    // const { chart, loading } = this.props;
    console.log(this.props); // eslint-disable-line
    return (
      <Fragment>
        <div loading="true">测试</div>
        <ImageWrapper
          src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png"
          desc="示意图"
          style={{ fontSize: '20' }}
        />
      </Fragment>
    );
  }
}
