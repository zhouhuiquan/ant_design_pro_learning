import React, { Component } from 'react';
import { routerRedux } from 'dva/router'; // eslint-disable-line
import { Form, message, Alert } from 'antd'; // eslint-disable-line
import { connect } from 'dva';

import style from './index.less';

@connect(({ login }) => ({ login }))
export default class Login extends Component {
  state = {
    userName: '',
    password: '',
    errorMessage: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    // this.props.onSubumit(this.state)
    if (!this.state.userName.trim()) {
      return this.setState({ errorMessage: '请填写用户名' });
    }
    if (!this.state.password.trim()) {
      return this.setState({ errorMessage: '请填写登录密码' });
    }
    if (this.state.userName !== 'admin' || this.state.password !== 'admin') {
      return this.setState({ errorMessage: '用户名或密码不正确' });
    }
    this.setState({ errorMessage: '' });
    message.success('登录');
    this.props.dispatch({
      type: 'mylogin/login',
    });
  };

  userNameChange = e => {
    this.setState({
      userName: e.target.value,
    });
  };
  passwordChange = e => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    const renderMessage = content => (
      <Alert
        style={{
          margin: '0 auto',
          marginTop: 10,
          width: 300,
          textAlign: 'left',
          color: 'white',
          backgroundColor: '#666666',
        }}
        message={content}
        type="error"
        showIcon
        className={style.icon}
      />
    );

    return (
      <div className={style.login}>
        <div className={style.title_name}>
          <img src="/public/u18.png" alt="logo" />
          <h2>政务数据共享交换开放系统</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className={style.user_name}>
            <i />
            <input
              type="text"
              value={this.state.userName}
              placeholder="请输入用户名称"
              onChange={this.userNameChange}
            />
          </div>
          <div className={style.password}>
            <i />
            <input
              type="password"
              value={this.state.password}
              placeholder="请输入登录密码"
              onChange={this.passwordChange}
            />
          </div>
          {this.state.errorMessage && renderMessage(this.state.errorMessage)}
          <input type="submit" className={style.button} value="登录" />
        </form>
      </div>
    );
  }
}
