import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker, Input, Select, Button } from 'antd';

import MyPageHeaderLayout from '../../layouts/MyPageHeaderLayout';
import MyStandardTable from '../../components/MyStandardTable';
import styles from './Log.less';

const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ myrule, loading }) => ({
  myrule,
  loading: loading.models.myrule,
}))
export default class Log extends Component {
  state = {
    IPValue: '',
  };

  handleIPChange = e => {
    this.setState({
      IPValue: e.target.value,
    });
  };
  handleSearch = () => {
    console.log(this.state.IPValue); // eslint-disable-line
    const { dispatch } = this.props;
    dispatch({
      type: 'myrule/log',
      payload: { flag: '这里是搜索', IPValue: this.state.IPValue },
    });
  };

  handleStandardTableChange = pagination => {
    // console.log(pagination, filtersArg, sorter)
    const { dispatch } = this.props;
    dispatch({
      type: 'myrule/log',
      payload: pagination,
    });
  };

  render() {
    const { IPValue } = this.state;
    const { myrule: { data }, loading } = this.props;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '登录时间',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: '登录IP',
        dataIndex: 'ip',
        align: 'center',
      },
      {
        title: '登录结果',
        dataIndex: 'result',
        align: 'center',
      },
    ];
    return (
      <div>
        <MyPageHeaderLayout />
        <div className={styles.box}>
          <div className={styles.search}>
            <RangePicker className={styles.picker} style={{ widht: 200, marginRight: 20 }} />
            <Input
              className={styles.IPInput}
              placeholder="IP地址"
              value={IPValue}
              onPressEnter={this.handleSearch}
              onChange={this.handleIPChange}
              style={{ marginRight: 20 }}
            />
            <Select defaultValue="all" style={{ width: 112, marginRight: 20 }}>
              <Option value="all">全部</Option>
              <Option value="success">登录成功</Option>
              <Option value="fail">登录失败</Option>
            </Select>
            <Button type="primary" icon="search">
              搜索
            </Button>
          </div>
          <div>
            <MyStandardTable
              columns={columns}
              data={data}
              loading={loading}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
