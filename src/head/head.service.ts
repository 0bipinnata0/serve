import { AppService } from './../app.service';
import { createScript } from './../utils/connectHelp';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HeadService {
  constructor(private readonly appService: AppService) {}

  async getHead(): Promise<string> {
    const ssh = this.appService.getSSh();
    const data = await ssh.exec(createScript('cores'));
    const globalData = data
      .split('\n')
      .filter((item) => item)
      .map((item) => item.trim().split(' '));
    const output = new Array(globalData[0].length).fill(1);
    const result = {
      cores: output.map((_, index) => ({
        key: index,
        name: globalData[0][index],
        number: globalData[1][index],
      })),
    };
    console.log(result);
    return JSON.stringify(result);
  }
}
