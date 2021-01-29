import React from "react";
import styles from "./index.less";
import { Table, Tag } from "antd";
import moment from 'moment';
import { DatePicker } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { Component } from 'react';
import type { TableBasicP } from './data';

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location"
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user"
  },
  {
    title: "Spend_time",
    key: "spend_time",
    dataIndex: "spend_time"
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (text, record, row) => {
      switch (text) {
        case '0':
          return (
            <Tag color="#69be43">running</Tag>
          )
          break;
        case '1':
          return (
            <Tag color="#e39f46">stop</Tag>
          )
          break;

        case '2':
          return (
            <Tag color="#f16c6f">delete</Tag>
          )
          break;
        default:
          return (<div />)
      }

    }
  },
  {
    title: "Create_time",
    key: "create_time",
    dataIndex: "create_time",
    render: (text, record, row) => {
      return (
        <DatePicker
          defaultValue={moment(text, "YYYY-MM-DD HH:mm:ss")}
          format={"YYYY-MM-DD HH:mm:ss"}
          disabled={true}
          // onOpenChange={() => { }}
          inputReadOnly={true}
          suffixIcon={<ClockCircleOutlined />}
        />
      )
    }
  },
  {
    title: '',
    key: 'run',
    render: (text, record) => (
      <>
        <Tag color="#69be43">run</Tag>
      </>
    ),
  },
  {
    title: '',
    key: 'stop',
    render: (text, record) => (
      <>
        <Tag color="#e39f46">stop</Tag>
      </>
    ),
  },
  {
    title: '',
    key: 'delete',
    render: (text, record) => (
      <>
        <Tag color="#f16c6f">delete</Tag>
      </>
    ),
  },
];


type TableBasicProps = {
  tableBasic: TableBasicP;
  dispatch: Dispatch<any>;
  loading: boolean;
}

class TableBasic extends Component<
  TableBasicProps
  > {
  reqRef: number = 0;
  timeoutId: number = 0;
  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'tableBasic/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableBasic/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }


  render() {
    // const { tableBasic, loading } = this.props;
    const { tableBasic } = this.props;
    const data = tableBasic.value
    return (
      <div className={styles.container}>
        <div id="components-table-demo-basic">
          <Table columns={columns} dataSource={data} bordered={true} />
        </div>
      </div>
    )
  }
}


export default connect(
  ({
    tableBasic,
    loading,
  }: {
    tableBasic: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    tableBasic,
    loading: loading.effects['tableBasic/fetch'],
  }),
)(TableBasic);
