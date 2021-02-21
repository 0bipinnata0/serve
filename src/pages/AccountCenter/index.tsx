import { Card, Col, Row, List, Descriptions, Button, Space } from 'antd';
import React, { Component, Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { CurrentUser } from '../AccountSettings/data';
import styles from './Center.less';
import {
  BarsOutlined,
  ClockCircleOutlined,
  DatabaseOutlined,
  UserOutlined,
} from '@ant-design/icons';

type AccountSettingsType = {
  accountCenter: any;
  dispatch: Dispatch<any>;
  loading: boolean;
};

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

type dataSourceType = {
  id: string;
  title: string;
  description?: string;
  renderFunc: (obj: CurrentUser) => any;
}[];
const dataSource: dataSourceType = [
  {
    id: 'description',
    title: '项目组描述',
    // description: '项目组负责人很懒，什么都没有留下',
    renderFunc: ({ description }) => (
      <Card bordered={false} style={{ width: '85%' }} bodyStyle={{ padding: 'initial' }}>
        <div>{description || '项目组负责人很懒，什么都没有留下'}</div>
      </Card>
    ),
  },
  {
    id: 'account',
    title: '负责人账号',
    renderFunc: ({ account }) => (
      <Card bordered={false} style={{ width: '85%' }} bodyStyle={{ padding: 'initial' }}>
        <Button icon={<UserOutlined />}>{account}</Button>
      </Card>
    ),
  },
  {
    id: 'avatar',
    title: '项目组资源',
    renderFunc: ({ avatar, resourceName, resourceCode, cores, continues, capacity }) => (
      <Card style={{ width: '85%' }} bodyStyle={{ padding: 'initial' }}>
        <Card.Grid style={{ width: '10%', boxShadow: 'initial' }} hoverable={false}>
          <div className={styles.avatarSmall}>
            <img alt="" src={avatar} />
          </div>
        </Card.Grid>
        <Card.Grid style={{ width: '90%', boxShadow: 'initial' }} hoverable={false}>
          <List>
            <List.Item.Meta avatar={resourceName} title={resourceCode} />
            <List.Item
              key={'1'}
              actions={[
                <IconText icon={BarsOutlined} text={cores} key="list-vertical-star-o" />,
                <IconText icon={ClockCircleOutlined} text={continues} key="list-vertical-like-o" />,
                <IconText icon={DatabaseOutlined} text={capacity} key="list-vertical-message" />,
              ]}
            />
          </List>
        </Card.Grid>
      </Card>
    ),
  },
];
class AccountCenter extends Component<AccountSettingsType> {
  reqRef: number = 0;
  timeoutId: number = 0;
  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'accountCenter/fetch',
      });
    });
  }
  renderUserInfo = (currentUser: Partial<CurrentUser>) => (
    <div className={styles.detail}>
      <Descriptions>
        <Descriptions.Item label="负责人">{currentUser.leader}</Descriptions.Item>
      </Descriptions>
    </div>
  );

  render() {
    const { accountCenter, loading } = this.props;
    const { userInfo } = accountCenter;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={24} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
              <div>
                <Card.Grid style={{ width: '20%', boxShadow: 'initial' }} hoverable={false}>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={userInfo.avatar} />
                  </div>
                </Card.Grid>
                <Card.Grid style={{ width: '80%', boxShadow: 'initial' }} hoverable={false}>
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>项目组详情</div>
                    {this.renderUserInfo(userInfo)}
                  </div>
                </Card.Grid>
              </div>
            </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card className={styles.tabsCard} bordered={false}>
              <Fragment>
                <List
                  itemLayout="horizontal"
                  dataSource={dataSource}
                  renderItem={({ renderFunc, title }) => {
                    return (
                      <List.Item>
                        <List.Item.Meta title={title} />
                        {renderFunc && renderFunc(userInfo)}
                      </List.Item>
                    );
                  }}
                />
              </Fragment>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

type obj = {
  accountCenter: any;
  loading: {
    effects: Record<string, boolean>;
  };
};

const mapStateToProps = ({ accountCenter, loading }: obj) => {
  return {
    accountCenter,
    loading: loading.effects['accountCenter/fetch'],
  };
};

export default connect(mapStateToProps)(AccountCenter);
