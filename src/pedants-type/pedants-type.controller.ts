import { Post, Req } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

interface IFakeChartData {
  availableTime: { x: string; y: number }[];
  storage: { x: string; y: number }[];
  nodes: { key: string; name: string; number: string }[];
  cores: { key: string; name: string; number: string }[];
}

export interface NoticeType {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

interface CurrentUser {
  access: string;
  account: string;
  address: string;
  avatar: string;
  capacity: string;
  continues: string;
  cores: string;
  country: string;
  description: string;
  leader: string;
  notifyCount: any;
  password: string;
  phone: string;
  resourceCode: string;
  resourceName: string;
  unreadCount: any;
  userid: string;
}

@Controller('api')
export class PedantsTypeController {
  @Get('fake_chart_data')
  getFakeChartData(@Req() request): IFakeChartData {
    return {
      availableTime: [
        { x: 'Total', y: 1000 },
        { x: 'Used', y: 500 },
        { x: 'Left', y: 500 },
      ],
      storage: [
        { x: 'Total', y: 1000 },
        { x: 'Used', y: 770 },
        { x: 'Left', y: 230 },
      ],
      nodes: [
        {
          key: '1',
          name: 'Total',
          number: '4',
        },
        {
          key: '2',
          name: 'Running',
          number: '2',
        },
        {
          key: '3',
          name: 'Free',
          number: '2',
        },
        {
          key: '4',
          name: 'Error',
          number: '0',
        },
      ],
      cores: [
        {
          key: '1',
          name: 'Total',
          number: '216',
        },
        {
          key: '2',
          name: 'Running',
          number: '108',
        },
        {
          key: '3',
          name: 'Free',
          number: '108',
        },
        {
          key: '4',
          name: 'Error',
          number: '0',
        },
      ],
    };
  }

  @Get('currentUser')
  getCurrentUser(): CurrentUser {
    return {
      access: 'admin',
      account: 'gemoumou123',
      address: '西湖区工专路 77 号',
      avatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      capacity: '2000GB',
      continues: '200200核小时',
      cores: '480核',
      country: 'China',
      description: '',
      leader: '葛某某',
      notifyCount: {},
      password: '123456',
      phone: '0752-268888888',
      resourceCode: 'ZY09003049',
      resourceName: '资源编号',
      unreadCount: {},
      userid: '00000001',
    };
  }

  @Get('fake_node')
  getFakeNode() {
    return [
      {
        key: '1',
        name: 'compute-0-0',
        cpu: '24/24',
        mem: '100/256',
        state: 'alloc',
      },
      {
        key: '2',
        name: 'compute-0-1',
        cpu: '0/24',
        mem: '2/256',
        state: 'idle',
      },
      {
        key: '3',
        name: 'compute-0-2',
        cpu: '0/24',
        mem: '2/256',
        state: 'idle',
      },
      {
        key: '4',
        name: 'compute-0-3',
        cpu: '*/24',
        mem: '*/256',
        state: 'down',
      },
    ];
  }

  @Post(['login/account'])
  loginAccount(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    let isLogin = false;
    if (username === 'admin' && password === 'admin') {
      isLogin = true;
    }
    let result = {
      status: 'error',
      currentAuthority: 'guest',
    };
    if (isLogin) {
      result = {
        status: 'ok',
        currentAuthority: 'admin',
      };
    }

    return result;
  }

  @Get('login/outLogin')
  loginOut() {
    return { data: {}, success: true };
  }
}
