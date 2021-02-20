import { FormattedMessage } from 'umi';
import React from 'react';

import { List } from 'antd';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const getData = (account: string, password: string, description: string) => [
  {
    title: '用户名',
    description: <>{account}</>,
    actions: [
      <a key="Modify">
        <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
      </a>,
    ],
  },
  {
    title: '密码',
    description: <>{password}</>,
    actions: [
      <a key="Modify">
        <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
      </a>,
    ],
  },
  {
    title: '项目组描述',
    description: <>{description}</>,
    actions: [
      <a key="Set">
        <FormattedMessage id="accountsettings.security.set" defaultMessage="Set" />
      </a>,
    ],
  },
];
const SecurityView = ({
  account,
  password,
  description,
}: {
  account: any;
  password: any;
  description: any;
}) => {
  const data = getData(account, password, description);
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default SecurityView;
