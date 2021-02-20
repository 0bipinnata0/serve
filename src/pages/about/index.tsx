import { MailOutlined, PhoneOutlined, QqOutlined } from '@ant-design/icons';
import { Card, Descriptions, List } from 'antd';
import React from 'react';
import styles from './index.less';

export default () => (
  <div className={styles.container}>
    <div className="site-card-border-less-wrapper">
      <Card title="研之成理(杭州)网络科技有限公司" bordered={false} style={{ width: '100%' }}>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item
            label="庚子矩阵服务器:"
            labelStyle={{ width: '20%', verticalAlign: 'text-top' }}
          >
            <Card bordered={false} bodyStyle={{ padding: '1px' }}>
              承诺三年质保
              <br />
              安装任何软件/集群
              <br />
              解决程序使用问题
            </Card>
          </Descriptions.Item>
          <Descriptions.Item
            label="联系方式："
            labelStyle={{ width: '20%', verticalAlign: 'text-top' }}
          >
            <List split={false} style={{ marginLeft: '10px' }}>
              <List.Item style={{ padding: '6px' }}>
                <List.Item.Meta
                  avatar={<PhoneOutlined rotate={90} />}
                  description={'021-61872210'}
                />
              </List.Item>
              <List.Item style={{ padding: '6px' }}>
                <List.Item.Meta avatar={<MailOutlined />} description={'zyyao@ssctech.net'} />
              </List.Item>
              <List.Item style={{ padding: '6px' }}>
                <List.Item.Meta avatar={<QqOutlined />} description={'交流QQ群105654647'} />
              </List.Item>
            </List>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  </div>
);
