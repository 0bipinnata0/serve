import { Controller, Get } from '@nestjs/common';

@Controller('currentUser')
export class UsersController {
  @Get()
  getTasks(): Promise<string> {
    return Promise.resolve(
      JSON.stringify({
        leader: '葛某某',
        description: '',
        account: 'gemoumou123',
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        resourceName: '资源编号',
        resourceCode: 'ZY09003049',
        cores: '480核',
        continues: '200200核小时',
        capacity: '2000GB',
        userid: '00000001',
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: '',
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
        password: '123456',
      }),
    );
  }
}