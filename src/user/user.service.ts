import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  private readonly userList: Array<UserEntity>;

  // TODO 手动修改对应用户的数据需要重启服务
  constructor(private readonly jwtService: JwtService) {
    const user = fs.readFileSync('./sh/user/user.json');
    this.userList = JSON.parse(user.toString());
  }

  async find(username: string): Promise<UserEntity> {
    const user = this.userList.find((user) => user.username === username);
    if (user) return user;
    else return null;
  }

  getUserInfo(token: any): any {
    const { sub } = <Record<string, string>>this.jwtService.decode(token);
    const userInfo = JSON.parse(
      fs.readFileSync(`./sh/user/info/${sub}.json`).toString(),
    );
    const userIndex = JSON.parse(
      fs.readFileSync('./sh/user/user.json').toString(),
    ).filter(({ id }) => id === sub)[0];
    return {
      ...userInfo,
      ...userIndex,
      account: userIndex.username,
    };
  }

  modifyUser(key: string, value: string, token: string) {
    const userIndex = <Record<string, string>>this.jwtService.decode(token);
    const targetFile = './sh/user/user.json';

    const userInfo = JSON.parse(fs.readFileSync(targetFile).toString());

    // userInfo.map()
    userInfo.forEach(
      (item) => item.id === userIndex.sub && (item[key] = value),
    );
    fs.writeFileSync(targetFile, JSON.stringify(userInfo));
  }
}
