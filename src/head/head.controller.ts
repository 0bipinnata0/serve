import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HeadService } from './head.service';

@Controller('head')
@UseGuards(AuthGuard('jwt'))
export class HeadController {
  constructor(private readonly headService: HeadService) {}

  @Get()
  getHello(): Promise<string> {
    return this.headService.getHead();
  }
}
