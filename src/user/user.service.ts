import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  // TODO: 手动修改对应用户的数据需要重启服务
  constructor(private readonly jwtService: JwtService) {}

  async find(username: string): Promise<UserEntity> {
    const users = fs.readFileSync('./sh/user/user.json');
    const userList = JSON.parse(users.toString());
    const user = userList.find((userItem) => userItem.username === username);
    if (user) {
      const userInfoByte = fs.readFileSync(`./sh/user/info/${user.id}.json`);
      const userInfo = JSON.parse(userInfoByte.toString());
      user.account = userInfo.account;
      return user;
    } else return null;
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

  modifyDescription(description: string, token: string) {
    const { sub } = <Record<string, string>>this.jwtService.decode(token);
    const targetFile = `./sh/user/info/${sub}.json`;
    const userInfo = JSON.parse(fs.readFileSync(targetFile).toString());
    userInfo.description = description;
    fs.writeFileSync(targetFile, JSON.stringify(userInfo));
  }
}
