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

  @Get('fake_tasks')
  fakeTasks() {
    return {
      value: [
        {
          key: '0',
          id: '0',
          location: '/home/gengze',
          user: 'name',
          spend_time: '1974',
          status: '1',
          create_time: '1974-05-10 07:49:31',
        },
        {
          key: '1',
          id: '1',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2831',
          status: '2',
          create_time: '2011-06-29 23:53:54',
        },
        {
          key: '2',
          id: '2',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2706',
          status: '0',
          create_time: '2009-12-29 06:16:16',
        },
        {
          key: '3',
          id: '3',
          location: '/home/gengze',
          user: 'name',
          spend_time: '977',
          status: '1',
          create_time: '1970-09-27 17:11:13',
        },
        {
          key: '4',
          id: '4',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2445',
          status: '2',
          create_time: '1982-10-30 22:27:42',
        },
        {
          key: '5',
          id: '5',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2466',
          status: '0',
          create_time: '1999-09-12 21:40:23',
        },
        {
          key: '6',
          id: '6',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2431',
          status: '0',
          create_time: '1977-12-17 23:20:58',
        },
        {
          key: '7',
          id: '7',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2431',
          status: '0',
          create_time: '1977-12-17 23:20:58',
        },
        {
          key: '8',
          id: '8',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2431',
          status: '0',
          create_time: '1977-12-17 23:20:58',
        },
        {
          key: '9',
          id: '9',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2431',
          status: '0',
          create_time: '1977-12-17 23:20:58',
        },
        {
          key: '10',
          id: '10',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2431',
          status: '0',
          create_time: '1977-12-17 23:20:58',
        },
        {
          key: '11',
          id: '11',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2431',
          status: '0',
          create_time: '1977-12-17 23:20:58',
        },
        {
          key: '12',
          id: '12',
          location: '/home/gengze',
          user: 'name',
          spend_time: '2431',
          status: '0',
          create_time: '1977-12-17 23:20:58',
        },
      ],
    };
  }

  @Get('fake_statistics')
  fakeStatistics() {
    return {
      data: [
        {
          key: '1',
          username: 'Gengzi',
          thismonth: '3',
          lastmonth: '3',
          total: '6',
        },
        {
          key: '2',
          username: 'User1',
          thismonth: '1',
          lastmonth: '1',
          total: '2',
        },
        {
          key: '3',
          username: 'User2',
          thismonth: '2',
          lastmonth: '2',
          total: '4',
        },
        {
          key: '4',
          username: 'User3',
          thismonth: '1',
          lastmonth: '2',
          total: '3',
        },
      ],
    };
  }
}
