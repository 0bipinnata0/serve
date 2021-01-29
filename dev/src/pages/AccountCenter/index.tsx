import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import type { ModalState } from './model';
import type { CurrentUser } from './data.d';
import styles from './Center.less';
import { Descriptions } from 'antd';
import { Fragment } from 'react';
import { List } from 'antd';
import { BarsOutlined, ClockCircleOutlined, DatabaseOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Space } from 'antd';

type AccountCenterProps = {
  dispatch: Dispatch<any>;
  currentUser: Partial<CurrentUser>;
  currentUserLoading: boolean;
} & RouteChildrenProps
type AccountCenterState = {
  tabKey?: 'articles' | 'applications' | 'projects';
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const aaabbbccc = [
  {
    id: 'description',
    title: '项目组描述',
    description: '项目组负责人很懒，什么都没有留下',
    content: ({ description }) => <div>
      {description}
    </div>,
  },
  {
    id: 'account',
    title: '负责人账号',
    content: ({ account }) =>
      <Card bordered={false} style={{ width: "85%" }} bodyStyle={{ padding: 'initial' }}>
        <Button icon={<UserOutlined />}>
          {account}
        </Button>
      </Card>,
  },
  {
    id: 'avatar',
    title: '项目组资源',
    content: ({ avatar, resourceName, resourceCode, cores, continues, capacity }) =>
      <Card style={{ width: "85%" }} bodyStyle={{ padding: 'initial' }}>
        <Card.Grid style={{ width: '10%', boxShadow: 'initial' }} hoverable={false}>
          <div className={styles.avatarSmall}>
            <img alt="" src={avatar} />
          </div></Card.Grid>
        <Card.Grid style={{ width: '90%', boxShadow: 'initial' }} hoverable={false}>
          <List>
            <List.Item.Meta avatar={resourceName} title={resourceCode} />
            <List.Item
              key={'1'}
              actions={[
                <IconText icon={BarsOutlined} text={cores} key="list-vertical-star-o" />,
                <IconText icon={ClockCircleOutlined} text={continues} key="list-vertical-like-o" />,
                <IconText icon={DatabaseOutlined} text={capacity} key="list-vertical-message" />,
              ]} />
          </List>
        </Card.Grid>

      </Card >,
  },
];
class AccountCenter extends Component<
  AccountCenterProps,
  AccountCenterState
  > {
  state: AccountCenterState = {
    tabKey: 'articles',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountCenter/fetchCurrent',
    });
  }

  onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key as AccountCenterState['tabKey'],
    });
  };

  renderUserInfo = (currentUser: Partial<CurrentUser>) => (
    <div className={styles.detail}>
      <Descriptions>
        <Descriptions.Item label="负责人">{currentUser.leader}</Descriptions.Item>
      </Descriptions>
    </div>
  );

  render() {
    const { currentUser = {}, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={24} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading} >
              {!dataLoading && (
                <div>
                  <Card.Grid style={{ width: '20%', boxShadow: 'initial' }} hoverable={false}>
                    <div className={styles.avatarHolder}>
                      <img alt="" src={currentUser.avatar} />
                    </div>
                    {/* <Divider dashed />
                  <TagList tags={currentUser.tags || []} /> */}
                  </Card.Grid>
                  <Card.Grid style={{ width: '80%', boxShadow: 'initial' }} hoverable={false} >
                    <div className={styles.team}>
                      <div className={styles.teamTitle}>项目组详情</div>
                      {this.renderUserInfo(currentUser)}
                    </div>
                  </Card.Grid>
                </div>
              )}
            </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
            >
              <Fragment>
                <List
                  itemLayout="horizontal"
                  dataSource={aaabbbccc}
                  renderItem={(item) => {
                    const target = currentUser[item.id]
                    const renderFunc = item.content
                    return (
                      <List.Item>
                        <List.Item.Meta
                          avatar={item.avatar}
                          title={item.title}
                          description={target ? '' : item.description}
                        />
                        {target ? renderFunc(currentUser) : null}
                      </List.Item>
                    )
                  }}
                />
              </Fragment>
            </Card>
          </Col>
        </Row>
      </GridContent >
    );
  }
}

export default connect(
  ({
    loading,
    accountCenter,
  }: {
    loading: { effects: { [key: string]: boolean } };
    accountCenter: ModalState;
  }) => ({
    currentUser: accountCenter.currentUser,
    currentUserLoading: loading.effects['accountCenter/fetchCurrent'],
  }),
)(AccountCenter);
