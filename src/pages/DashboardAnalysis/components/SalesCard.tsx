import { Card } from 'antd';
import { FormattedMessage } from 'umi';
import React from 'react';
import type { VisitDataType } from '../data.d';
import { Bar } from './Charts';
import styles from '../style.less';
import { Table } from 'antd';

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'size',
    dataIndex: 'size',
    key: 'size',
  },
];

const SalesCard = ({
  availableTime,
  storage,
  loading,
}: {
  availableTime: VisitDataType[];
  storage: VisitDataType[];
  loading: boolean;
}) => (
  <Card title="项目组资源" loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <Card.Grid
      style={{
        width: '100%',
        textAlign: 'center',
      }}
      hoverable={false}
    >
      <Card.Grid
        style={{
          width: '50%',
          textAlign: 'center',
        }}
        hoverable={false}
      >
        <div className={styles.salesBar}>
          <Bar
            height={295}
            title={
              <FormattedMessage
                id="dashboardanalysis.analysis.available-time"
                defaultMessage="Available Time"
              />
            }
            data={availableTime}
          />
        </div>
      </Card.Grid>
      <Card.Grid
        style={{
          width: '50%',
          textAlign: 'center',
        }}
        hoverable={false}
      >
        <Card title="Available Time" bordered={false} headStyle={{ textAlign: 'center' }}>
          <Table
            showHeader={false}
            dataSource={availableTime.map(({ x, y }, key) => ({
              key,
              name: x,
              size: `${y}h`,
            }))}
            columns={columns}
            pagination={{ hideOnSinglePage: true }}
          />
        </Card>
      </Card.Grid>
    </Card.Grid>
    <Card.Grid
      style={{
        width: '100%',
        textAlign: 'center',
      }}
      hoverable={false}
    >
      <Card.Grid
        style={{
          width: '50%',
          textAlign: 'center',
        }}
        hoverable={false}
      >
        <div className={styles.salesBar}>
          <Bar
            height={295}
            title={
              <FormattedMessage id="dashboardanalysis.analysis.storage" defaultMessage="storage" />
            }
            data={storage}
          />
        </div>
      </Card.Grid>
      <Card.Grid
        style={{
          width: '50%',
          textAlign: 'center',
        }}
        hoverable={false}
      >
        <Card title="Storage" bordered={false} headStyle={{ textAlign: 'center' }}>
          <Table
            showHeader={false}
            dataSource={storage.map(({ x, y }, key) => ({
              key,
              name: x,
              size: `${y}G`,
            }))}
            columns={columns}
            pagination={{ hideOnSinglePage: true }}
          />
        </Card>
      </Card.Grid>
    </Card.Grid>
  </Card>
);

export default SalesCard;
