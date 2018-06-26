import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Cascader, DatePicker, Select, Button } from 'antd'

import MyStandardTable from '../../components/MyStandardTable'
import styles from './Log.less'

const { RangePicker } = DatePicker

@connect(({ auditLog, loading }) => ({ auditLog, loading: loading.models.auditLog }))
export default class AuditLog extends Component {
  state = {
    query: {
      account: '',
      organization: '',
      ip: '',
      date: [],
      state: -1
    },
    pagination: {
      current: 1,
      pageSize: 10,
    }
  }

  componentDidMount () {
    const { pagination, query } = this.state
    // this.props.dispatch({
    //   type: 'auditLog/organization'
    // })
    this.props.dispatch({
      type: 'auditLog/state'
    })
    this.props.dispatch({
      type: 'auditLog/log',
      payload: { pagination, query }
    })
  }

  handleUserNameChange = (e) => {
    let query = { ...this.state.query, account: e.target.value }
    this.setState({
      query
    })
  }

  handleOrganizationChange = (value) => {
    let query = { ...this.state.query, organization: value }
    this.setState({
      query
    })
  }

  handleIPChange = (e) => {
    let query = { ...this.state.query, ip: e.target.value }
    this.setState({
      query,
    })
  }

  handleDatePickerChange = (value) => {
    let query = { ...this.state.query, date: value.map(item => +item.format('x')) }
    this.setState({
      query,
    })
  }

  handleResultChange = (value) => {
    // let query = { ...this.state.query, state: value }
    this.setState({
      query: {
        ...this.state.query,
        state: value
      }
    })
  }

  handleSearch = () => {
    let pagination = {
      ...this.state.pagination,
      current: 1
    }
    this.props.dispatch({
      type: 'auditLog/log',
      payload: { ...this.state, pagination }
    })
  }

  handleTableChange = (pagination) => {
    const { query } = this.state
    this.props.dispatch({
      type: 'auditLog/log',
      payload: { query, pagination }
    })
  }

  render () {
    const { auditLog: { organizationList, stateList, data }, loading } = this.props

    const selectOptionList = stateList.map(item => {
      return <Select.Option value={item.value} key={item.value} >{item.label}</ Select.Option>
    })

    const columns = [
      {
        title: '用户名',
        dataIndex: 'account',
        align: 'center',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: '所属机构',
        dataIndex: 'organization',
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
      }
    ]

    return (
      <div className={styles.padding}>
        <Form>
          <Input onChange={this.handleUserNameChange} onPressEnter={this.handleSearch} className={styles.username} placeholder="请输入用户名" />
          <Cascader options={organizationList} onChange={this.handleOrganizationChange} style={{width: 112, marginRight: 10}} placeholder="请选择机构"></Cascader>
          <Input onChange={this.handleIPChange} onPressEnter={this.handleSearch} className={styles.ip} placeholder="请输入IP地址" />
          <RangePicker onChange={this.handleDatePickerChange} className={styles.date} />
          <Select defaultValue={-1} onChange={this.handleResultChange} style={{width: 112, marginRight: 10}} >
            {selectOptionList}
          </Select>
          <Button type="primary" onClick={this.handleSearch} icon="search">搜索</Button>
        </Form>
        <div>
          <MyStandardTable data={data} columns={columns} onChange={this.handleTableChange} loading={loading} />
        </div>
      </div>
    )
  }

}