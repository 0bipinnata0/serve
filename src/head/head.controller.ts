import { Controller, Get, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HeadService } from './head.service';

@Controller('head')
@UseGuards(AuthGuard('jwt'))
export class HeadController {
  constructor(private readonly headService: HeadService) {}

  @Get()
  getHello(@Headers('token') token: string): Promise<string> {
    return this.headService.getHead(token);
  }
}
