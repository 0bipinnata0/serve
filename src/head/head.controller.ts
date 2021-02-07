import { Controller, Get } from '@nestjs/common';
import { HeadService } from './head.service';

@Controller('head')
export class HeadController {
  constructor(private readonly headService: HeadService) {}

  @Get()
  getHello(): Promise<string> {
    return this.headService.getHead();
  }
}
