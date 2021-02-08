import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users: Array<UserEntity>;

  constructor() {
    this.users = [
      { id: 1, username: 'admin', password: 'admin' },
      { id: 2, username: 'tester', password: 'tester' },
    ];
  }

  async find(username: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.username === username);
    if (user) return user;
    else return null;
  }

  async listAll(): Promise<Array<UserEntity>> {
    return this.users.map((user) => {
      const { password, ...info } = user;
      return info;
    });
  }
}
