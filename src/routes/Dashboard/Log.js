import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker, Input, Select, Button } from 'antd';
import moment from 'moment'

import { getTimeDistance } from '../../utils/utils'
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
    state: -1,
    date: []
  };

  componentDidMount () {
    this.props.dispatch({
      type: 'myrule/state'
    })
    
    const dateRange = this.state.date.map((item, index) => {
      if (moment.isMoment(item)) {
        return +(item.format('x'))
      } else {
        return 0
      }
    })

    this.props.dispatch({
      type: 'myrule/log',
      payload: {query: {...this.state, date: dateRange}, pagination: {pageSize: 10, current: 1}}
    })
  }

  handleIPChange = e => {
    this.setState({
      IPValue: e.target.value,
    });
  };

  handSelectChange = val => {
    this.setState({
      state: val
    })
  }

  handlePick = (moment) => {
    this.setState({
      date: moment
    })
  }

  handleSearch = () => {
    console.log(this.state.date)
    const { dispatch } = this.props;
    const query = this.state
    const pagination = {
      current: 1,
      pageSize: 10
    }
    const dateRange = query.date.map((item, index) => {
      if (moment.isMoment(item)) {
        return +(item.format('x'))
      } else {
        return 0
      }
    })
    dispatch({
      type: 'myrule/log',
      payload: { query: { ...query, date: dateRange }, pagination,  },
    });
  };

  handleStandardTableChange = (pagination) => {
    // console.log(pagination, filtersArg, sorter)
    const query = this.state
    const { dispatch } = this.props;

    const dateRange = query.date.map((item, index) => {
      if (moment.isMoment(item)) {
        return +(item.format('x'))
      } else {
        return 0
      }
    })

    dispatch({
      type: 'myrule/log',
      payload: { query: {...query, date: dateRange}, pagination },
    });
  };

  render() {
    const { IPValue } = this.state;
    let { myrule: { data, pagination, stateList }, loading } = this.props;
    data = {
      list: data,
      pagination,
    }
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

    const optionList = stateList.map(item => {
      return <Option value={item.value} key={item.value}>{item.label}</Option>
    })

    return (
      <div>
        <MyPageHeaderLayout />
        <div className={styles.box}>
          <div className={styles.search}>
            <RangePicker value={this.state.date} className={styles.picker} onChange={this.handlePick} style={{ widht: 200, marginRight: 20 }} />
            <Input
              className={styles.IPInput}
              placeholder="IP地址"
              value={IPValue}
              onPressEnter={this.handleSearch}
              onChange={this.handleIPChange}
              style={{ marginRight: 20 }}
            />
            <Select value={this.state.state} onChange={this.handSelectChange} style={{ width: 112, marginRight: 20 }}>
              {optionList}
            </Select>
            <Button type="primary" onClick={this.handleSearch} icon="search">
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
