import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('currentUser')
  // async list(): Promise<Array<UserEntity>> {
  getUserInfo(@Req() req: Request): any {
    return this.userService.getUserInfo(req.headers.token);
  }
}
