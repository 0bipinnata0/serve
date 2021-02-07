import { getConnect } from './utils/connectHelp';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getSSh(): any {
    return getConnect();
  }
}
