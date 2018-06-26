import React, { Component } from 'react'
import { connect } from 'dva'
import dva from 'dva'
import { Form, Input, Select, DatePicker, Button, Cascader } from 'antd'

import styles from './Operation.less'
import MyStandardTable from '../../components/MyStandardTable'

const { RangePicker } = DatePicker

@connect(({ auditOperation, auditLog, loading }) =>( {
    auditOperation,
    auditLog,
    loading: loading.models.auditOperation
  }))
export default class Operation extends Component {
  state = {
    query: {
      account: '',
      organization: '',
      ip: '',
      date: [],
      operation: -1
    },
    pagination: {
      current: 1,
      pageSize: 10,
    }
  }

  async componentDidMount() {
    await this.props.dispatch({
      type: 'auditOperation/operation'
    })
    await this.props.dispatch({
      type: 'auditLog/organization'
    })
    await this.props.dispatch({
      type: 'auditOperation/search',
      payload: {
        query: this.state.query,
        pagination: {
          current: 1,
          pageSize: 10,
        }
      }
    })
  }

  handleNameChange = (e) => {
    this.setState({
      query: {
        ...this.state.query,
        account: e.target.value
      }
    })
  }
  handleOrganizationChange = (value) =>{
    this.setState({
      query: {
        ...this.state.query,
        organization: value,
      }
    })
  }
  handleIPChange = (e) => {
    this.setState({
      query: {
        ...this.state.query,
        ip: e.target.value,
      }
    })
  }
  handleDateChange = (value) => {
    let query = { ...this.state.query, date: value.map(item => +item.format('x')) }
    this.setState({
      query,
    })
  }
  handleOperationChange = (value) => {
    this.setState({
      query: {
        ...this.state.query,
        operation: value,
      }
    })
  }
  handleSearch = _ => {
    this.props.dispatch({
      type: 'auditOperation/search',
      payload: {
        ...this.state
      }
    })
  }
  tableChange = (pagination) => {
    // console.log(pagination)
    this.props.dispatch({
      type: 'auditOperation/search',
      payload: {
        ...this.state,
        pagination
      }
    })
  }

  render () {
    const { auditOperation: { data, operationList }, auditLog: {organizationList}, loading } = this.props

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
        title: '操作时间',
        dataIndex: 'time',
        align: 'center',
      },
      {
        title: '操作IP',
        dataIndex: 'ip',
        align: 'center',
      },
      {
        title: '操作类型',
        dataIndex: 'operation',
        align: 'center',
      },
      {
        title: '行为记录',
        dataIndex: 'detail',
        align: 'center',
      },
    ]

    const OperationList = operationList.map(item => {
      return (
        <Select.Option value={item.id} key={item.id} >{item.label}</Select.Option>
      )
    })

    return (
      <div className={styles.layout}>
        <Form>
          <Input onChange={this.handleNameChange} onPressEnter={this.handleSearch} className={styles.name} placeholder="请输入用户名" />
          <Cascader options={organizationList} onChange={this.handleOrganizationChange} placeholder='请选择机构' className={styles.organization} />
          <Input onChange={this.handleIPChange} onPressEnter={this.handleSearch} className={styles.ip} placeholder="请输入IP" />
          <RangePicker onChange={this.handleDateChange} className={styles.date} />
          <Select defaultValue={-1} onChange={this.handleOperationChange} className={styles.operation}>
            {OperationList}
          </Select>
          <Button type="primary" icon="search"  onClick={this.handleSearch}>搜索</Button>
        </Form>
        <div>
          <MyStandardTable data={data} columns={columns} onChange={this.tableChange} loading={loading} />
        </div>
      </div>
    )
  }
}