import React from 'react';

import { List } from 'antd';
import LabelInputTran from './LabelInputTrans';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const getData = (account: string, password: string, description: string) => [
  {
    id: 'account',
    title: '用户名',
    contend: account,
  },
  {
    id: 'password',
    title: '密码',
    contend: password,
  },
  {
    id: 'description',
    title: '项目组描述',
    contend: description,
  },
];

const SecurityView = ({
  account,
  password,
  description,
  loading,
  dispatch,
}: {
  account: any;
  password: any;
  description: any;
  dispatch: any;
  loading: boolean;
}) => {
  const data = getData(account, password, description);
  // return data.map((props) => <LabelInputTran {...props} />);
  return loading ? null : (
    <List<Unpacked<typeof data>>
      itemLayout="horizontal"
      dataSource={data}
      bordered
      renderItem={(props) => (
        <List.Item>
          <LabelInputTran {...props} dispatch={dispatch} />
        </List.Item>
      )}
    />
  );
};

export default SecurityView;
