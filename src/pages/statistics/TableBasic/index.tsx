import React, { Component } from 'react';
import styles from './index.less';
import { Col, Row, Select, Table } from 'antd';
import type { StatisticsType } from './data';
import { connect } from 'umi';

const columns = [
  {
    title: 'User name',
    dataIndex: 'username',
    key: 'username',
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: '使用时长',
    children: [
      {
        title: 'This month',
        dataIndex: 'thismonth',
        key: 'thismonth',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: 'Last month',
        dataIndex: 'lastmonth',
        key: 'lastmonth',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text: any) => <a>{text}</a>,
      },
      // {
      //   title: '',
      //   dataIndex: 'tmp',
      //   key: 'tmp',
      //   render: (text: any) => <a>{text}</a>,
      // },
    ],
  },
];

type StatisticsBaseType = {
  statistics: StatisticsType;
  dispatch: Dispatch<any>;
  loading: boolean;
};

class Statistics extends Component<StatisticsBaseType> {
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
    const { statistics, loading, dispatch } = this.props;
    const { data } = statistics;

    return (
      <div className={styles.container}>
        <Row>
          <Col span={20} />
          <Col span={4}>
            <Select
              labelInValue
              defaultValue={{ value: 'second' }}
              style={{ width: 120 }}
              onChange={({ key }) => {
                dispatch({ type: 'statistics/fetch', payload: key });
              }}
            >
              <Select.Option value="second">second</Select.Option>
              <Select.Option value="minute">minute</Select.Option>
              <Select.Option value="hour">hour</Select.Option>
            </Select>
          </Col>
        </Row>
        <div id="components-table-demo-basic">
          <Table columns={columns} dataSource={data} bordered={true} loading={loading} />
        </div>
      </div>
    );
  }
}

type obj = {
  statistics: any;
  loading: {
    effects: Record<string, boolean>;
  };
};

const mapStateToProps = ({ statistics, loading }: obj) => ({
  statistics,
  loading: loading.effects['statistics/fetch'],
});

export default connect(mapStateToProps)(Statistics);
