import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

// function initTotalList(columns) {
//   const totalList = [];
//   columns.forEach(column => {
//     if (column.needTotal) {
//       totalList.push({ ...column, total: 0 });
//     }
//   });
//   return totalList;
// }

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { data: { list, pagination }, loading, columns, rowKey } = this.props;

    console.log(this.props); // eslint-disable-line
    console.log(list); // eslint-disable-line
    console.log(pagination); // eslint-disable-line

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.handleRowSelectChange,
    //   getCheckboxProps: record => ({
    //     disabled: record.disabled,
    //   }),
    // };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert} />
        <Table
          loading={loading}
          bordered
          rowKey={rowKey || 'id'}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
