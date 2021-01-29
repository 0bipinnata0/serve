import { Card } from 'antd';
import { FormattedMessage } from 'umi';
import React from 'react';
import type { VisitDataType } from '../data.d';
import { Pie } from './Charts';
import { Table } from 'antd';

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'number',
    dataIndex: 'number',
    key: 'number',
  },
];
const gridStyle: CSSProperty = {
  width: '50%',
  textAlign: 'center',
};
const ProportionSales = ({
  loading,
  nodes,
  cores,
}: {
  loading: boolean,
  nodes: VisitDataType[],
  cores: VisitDataType[]
}) => {
  return nodes && cores && nodes[0] && cores[0] ? (
    <Card title="CPU" bordered={false} headStyle={{ textAlign: 'center' }} loading={loading}>
      <Card.Grid style={gridStyle}>
        <Card.Grid style={{
          width: '100%',
          textAlign: 'center',
        }}>
          <Card title="Nodes" bordered={false} headStyle={{ textAlign: 'center' }}>
            <Table showHeader={false} dataSource={nodes} columns={columns} pagination={{ hideOnSinglePage: true }} />
          </Card>
        </Card.Grid>
        <Card.Grid style={{
          width: '100%',
          textAlign: 'center',
        }}>
          <div>
            <Pie
              hasLegend
              subTitle={<FormattedMessage id="dashboardanalysis.analysis.running" defaultMessage="Running" />}
              total={() =>
                <>
                  {((nodes[1].number / nodes[0].number) * 100).toFixed(0)}%
          </>}
              data={[{ x: nodes[1].name, y: nodes[1].number * 1 }, { x: nodes[2].name, y: nodes[2].number * 1 }]}
              height={200}
              lineWidth={1}
            />
          </div>
        </Card.Grid>
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Card.Grid style={{
          width: '100%',
          textAlign: 'center',
        }}>
          <Card title="Cores" bordered={false} headStyle={{ textAlign: 'center' }}>
            <Table showHeader={false} dataSource={cores} columns={columns} pagination={{ hideOnSinglePage: true }} />
          </Card>
        </Card.Grid>
        <Card.Grid style={{
          width: '100%',
          textAlign: 'center',
        }}>
          <div>
            <Pie
              hasLegend
              subTitle={<FormattedMessage id="dashboardanalysis.analysis.running" defaultMessage="Running" />}
              total={() =>
                <>
                  {((cores[1].number / cores[0].number) * 100).toFixed(0)}%
               </>}
              data={[{ x: cores[1].name, y: cores[1].number * 1 }, { x: cores[2].name, y: cores[2].number * 1 }]}
              height={200}
              lineWidth={1}
            />
          </div>
        </Card.Grid>
      </Card.Grid>
    </Card>
  ) : <div />
};

export default ProportionSales;

