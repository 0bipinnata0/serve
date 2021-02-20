import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('currentUser')
  // async list(): Promise<Array<UserEntity>> {
  async list(): Promise<any> {
    return Promise.resolve({
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
    });
    // return this.userService.listAll();
  }
}
