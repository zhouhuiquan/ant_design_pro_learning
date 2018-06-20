import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import { getRoutes } from '../utils/utils';
// import { Icon } from 'antd';
// import logo from '../assets/logo.svg';
// import GlobalFooter from '../components/GlobalFooter';

// const links = [
//   {
//     key: 'help',
//     title: '帮助',
//     href: '',
//   },
//   {
//     key: 'privacy',
//     title: '隐私',
//     href: '',
//   },
//   {
//     key: 'terms',
//     title: '条款',
//     href: '',
//   },
// ];

// const copyright = (
//   <Fragment>
//     Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
//   </Fragment>
// );

class UserLayout extends Component {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Ant Design Pro`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
