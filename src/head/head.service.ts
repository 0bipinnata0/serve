import { TasksService } from './../tasks/tasks.service';
import { AppService } from './../app.service';
import { createScript } from './../utils/connectHelp';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HeadService {
  constructor(
    private readonly appService: AppService,
    private readonly tasksService: TasksService,
  ) {}

  async getHead(): Promise<string> {
    const ssh = this.appService.getSSh();
    const data = await ssh.exec(createScript('cores'));
    const globalData = data
      .split('\n')
      .filter((item) => item)
      .map((item) => item.trim().split(' '));
    const output = new Array(globalData[0].length).fill(1);

    const nodes = [1, 2, 3, 4];
    const nameArr = ['Total', 'Running', 'Free', 'Error'];
    const numberArr = [0, 0, 0, 0];
    const infoData = await ssh.exec('sinfo');
    const sinfoArr = this.tasksService.createArr(infoData);
    sinfoArr.forEach((item) => {
      const nodes = item.NODES * 1;
      numberArr[0] = numberArr[0] + nodes;
      switch (item.STATE) {
        case 'alloc':
          numberArr[1] = numberArr[1] + nodes;
          break;
        case 'idle':
          numberArr[2] = numberArr[2] + nodes;
          break;
        case 'down':
          numberArr[3] = numberArr[3] + nodes;
          break;
      }
    });
    return JSON.stringify({
      nodes: nodes.map((_, index) => ({
        key: index,
        name: nameArr[index],
        number: numberArr[index],
      })),
      cores: output.map((_, index) => ({
        key: index,
        name: globalData[0][index],
        number: globalData[1][index],
      })),
      availableTime: [],
      storage: [],
    });
  }
}
