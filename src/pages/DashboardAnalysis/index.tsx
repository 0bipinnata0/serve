import { Col, Row } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { AnalysisData } from './data.d';
// import styles from './style.less';

const SalesCard = React.lazy(() => import('./components/SalesCard'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));

type DashboardAnalysisProps = {
  dashboardAnalysis: AnalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

class DashboardAnalysis extends Component<
  DashboardAnalysisProps
  > {

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAnalysis/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAnalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { dashboardAnalysis, loading } = this.props;
    const {
      nodes,
      cores,
      availableTime,
      storage
    } = dashboardAnalysis;
    return (
      <GridContent>
        <React.Fragment>
          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  loading={loading}
                  nodes={nodes}
                  cores={cores}
                />
              </Suspense>
            </Col>

            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <SalesCard
                  availableTime={availableTime}
                  storage={storage}
                  loading={loading}
                />
              </Suspense>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    dashboardAnalysis,
    loading,
  }: {
    dashboardAnalysis: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    dashboardAnalysis,
    loading: loading.effects['dashboardAnalysis/fetch'],
  }),
)(DashboardAnalysis);
