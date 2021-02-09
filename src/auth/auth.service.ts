import { TokenEntity } from './token.entity';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.find(username);
    // 注：实际中的密码处理应通过加密措施
    if (user && user.password === password) {
      const { password, ...userInfo } = user;
      return userInfo;
    } else {
      return null;
    }
  }

  async login(user: UserEntity): Promise<TokenEntity> {
    const { id, username } = user;
    return {
      token: this.jwtService.sign({ username, sub: id }),
    };
  }
}
