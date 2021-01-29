import React from 'react';
import { MailOutlined, PhoneOutlined, QqOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    // style={{ backgroundColor: 'red' }}
    copyright="2021 研之成理(杭州)网络科技有限公司"
    links={[
      {
        key: 'phone',
        title: <span><PhoneOutlined rotate={90} style={{ marginRight: '8px' }} />021-61872210</span>,
        href: '',
        blankTarget: true,
      },
      {
        key: 'email',
        title: <span><MailOutlined style={{ marginRight: '8px' }} />zyyao@ssctech.net</span>,
        href: '',
        blankTarget: true,
      },
      {
        key: 'qq',
        title: <span><QqOutlined style={{ marginRight: '8px' }} /> 交流QQ群105654647</span>,
        href: '',
        blankTarget: true,
      },
    ]}
  />
);
