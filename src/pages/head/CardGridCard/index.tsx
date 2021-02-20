import React from 'react';
import styles from './index.less';
import { Card } from 'antd';
import DashboardAnalysisState from '@/pages/DashboardAnalysis/index';

export default () => (
  <div className={styles.container}>
    <div id="components-card-demo-grid-card">
      <Card>
        <DashboardAnalysisState />
      </Card>
    </div>
  </div>
);
