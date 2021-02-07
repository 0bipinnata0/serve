import { createScript } from './../utils/connectHelp';
import { AppService } from './../app.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  constructor(private readonly appService: AppService) {}

  async getStatistics(): Promise<string> {
    const ssh = this.appService.getSSh();
    const data = await ssh.exec(createScript('statistics'));
    const output = data
      .split('\n')
      .filter((item) => item)
      .map((item, index) => {
        const itemArr = item.trim().split('-');
        return {
          key: index,
          username: itemArr[0],
          thismonth: itemArr[1],
          lastmonth: itemArr[2],
          total: itemArr[3],
        };
      });
    return output;
  }
}
