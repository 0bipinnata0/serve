import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list(): Promise<Array<UserEntity>> {
    return this.userService.listAll();
  }
}
