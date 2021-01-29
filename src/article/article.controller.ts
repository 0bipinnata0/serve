import { Req } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Request } from 'express';

@Controller('article')
export class ArticleController {
  @Get()
  index(): string {
    return '这是article里面的index';
  }

  @Get('add')
  add(): string {
    return '这是article里面的index';
  }

  @Get('req')
  findAll(@Req() request: Request): string {
    console.log('res', request);
    return 'This action returns all cats';
  }
}
