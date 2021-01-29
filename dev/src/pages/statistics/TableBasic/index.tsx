import React, { Component } from "react";
import styles from "./index.less";
import { Table } from "antd";
import type { StatisticsType } from './data';
import { connect } from 'umi';

const columns = [
  {
    title: "User name",
    dataIndex: "username",
    key: "username",
    render: text => <a>{text}</a>
  },
  {
    title: "使用时长",
    children: [
      {
        title: "This month",
        dataIndex: "thismonth",
        key: "thismonth",
        render: text => <a>{text}</a>
      },
      {
        title: "Last month",
        dataIndex: "lastmonth",
        key: "lastmonth",
        render: text => <a>{text}</a>
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        render: text => <a>{text}</a>
      },
      {
        title: "",
        dataIndex: "tmp",
        key: "tmp",
        render: text => <a>{text}</a>
      },
    ]
  }
];


type StatisticsBaseType = {
  statistics: StatisticsType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

class Statistics extends Component<
  StatisticsBaseType
  > {
  reqRef: number = 0;
  timeoutId: number = 0;
  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'statistics/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'statistics/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }


  render() {
    const { statistics } = this.props;
    const datac = statistics.data
    return (
      <div className={styles.container}>
        <div id="components-table-demo-basic">
          <Table columns={columns} dataSource={datac} bordered={true} />
        </div>
      </div>
    )
  }
}

export default connect(
  ({
    statistics,
    loading,
  }: {
    statistics: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    statistics,
    loading: loading.effects['statistics/fetch'],
  }),
)(Statistics);
