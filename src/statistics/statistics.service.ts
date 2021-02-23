import { createScript } from './../utils/connectHelp';
import { AppService } from './../app.service';
import { Injectable } from '@nestjs/common';

const timeRate = {
  second: 1,
  minute: 60,
  hour: 3600,
};

@Injectable()
export class StatisticsService {
  constructor(private readonly appService: AppService) {}

  async getStatistics(type: string): Promise<{ data: string }> {
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
          thismonth: Math.floor(itemArr[1] / timeRate[type]),
          lastmonth: Math.floor(itemArr[2] / timeRate[type]),
          total: Math.floor(itemArr[3] / timeRate[type]),
        };
      });
    return { data: output };
  }
}
