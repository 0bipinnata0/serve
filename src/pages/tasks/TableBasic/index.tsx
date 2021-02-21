import React from 'react';
import styles from './index.less';
import { Button, Table, Tag } from 'antd';
import moment from 'moment';
import { DatePicker } from 'antd';
import { connect } from 'umi';
import { Component } from 'react';
import type { TableBasicP } from './data';
import { ClockCircleOutlined } from '@ant-design/icons';

type colType = {
  title: string;
  dataIndex?: string;
  key: string;
  onCell?: any;
  render?: any;
}[];

const columns: colType = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Spend_time',
    key: 'spend_time',
    dataIndex: 'spend_time',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text: string) => {
      switch (text) {
        case '0':
          return <Tag color="#69be43">running</Tag>;
        case '1':
          return <Tag color="#e39f46">stop</Tag>;
        case '2':
          return <Tag color="#f16c6f">delete</Tag>;
        default:
          return <div />;
      }
    },
  },
  {
    title: 'Create_time',
    key: 'create_time',
    dataIndex: 'create_time',
    render: (text: string) => {
      return (
        <DatePicker
          defaultValue={moment(text, 'YYYY-MM-DD HH:mm:ss')}
          format={'YYYY-MM-DD HH:mm:ss'}
          disabled={true}
          // onOpenChange={() => { }}
          inputReadOnly={true}
          suffixIcon={<ClockCircleOutlined />}
        />
      );
    },
  },
  {
    title: '',
    key: 'delete',
    render: () => (
      <Button type="text">
        <Tag color="#f16c6f">delete</Tag>
      </Button>
    ),
  },
];

type TableBasicProps = {
  tableBasic: TableBasicP;
  dispatch: Dispatch<any>;
  loading: boolean;
};

class TableBasic extends Component<TableBasicProps> {
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
    const { tableBasic, loading, dispatch } = this.props;
    const { data } = tableBasic;

    return (
      <div className={styles.container}>
        <div id="components-table-demo-basic">
          <Table
            columns={columns.map((item) =>
              item.key === 'delete'
                ? {
                    ...item,
                    onCell: (record: any) => ({
                      onClick: () => {
                        dispatch({
                          type: 'tableBasic/deleteSync',
                          payload: record.id,
                        });
                      },
                    }),
                  }
                : item,
            )}
            dataSource={data}
            bordered={true}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

type obj = {
  tableBasic: any;
  loading: {
    effects: Record<string, boolean>;
  };
};

const mapStateToProps = ({ tableBasic, loading }: obj) => ({
  tableBasic,
  loading: loading.effects['tableBasic/fetch'],
});

export default connect(mapStateToProps)(TableBasic);
