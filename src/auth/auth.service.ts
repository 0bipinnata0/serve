import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/common/interfaces/result.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.find(username);
    // 密码明文
    if (user && user.password === password) {
      // const { password, ...userInfo } = user;
      return user;
    } else {
      return null;
    }
  }

  async login(user: UserEntity): Promise<ResponseData> {
    const { id, username, password } = user;
    return {
      statusCode: 200,
      message: 'ok',
      data: this.jwtService.sign({ username, password, sub: id }),
    };
  }
}
