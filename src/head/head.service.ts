import { TasksService } from './../tasks/tasks.service';
import { AppService } from './../app.service';
import { createScript } from './../utils/connectHelp';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HeadService {
  constructor(
    private readonly appService: AppService,
    private readonly tasksService: TasksService,
    private readonly jwtService: JwtService,
  ) {}

  async getHead(token: string): Promise<string> {
    const cores = [1, 2, 3, 4];
    const nodes = [1, 2, 3, 4];
    const availableTime = [1, 2, 3];
    const storage = [1, 2, 3];

    const ssh = this.appService.getSSh();
    const { account } = <Record<string, string>>this.jwtService.decode(token);

    const nodesRow = await ssh.exec(createScript('nodes', account));
    const coresRow = await ssh.exec(createScript('cores', account));
    const availableTimeRow = await ssh.exec(createScript('availableTime'));
    const storageRow = await ssh.exec(createScript('storage'));

    const coresList = coresRow
      .split('\n')
      .filter((item) => item)
      .map((item) => item.trim().split('-'));

    const nodesList = nodesRow
      .split('\n')
      .filter((item) => item)
      .map((item) => item.trim().split('-'));

    const availableTimeList = availableTimeRow
      .split('\n')
      .filter((item) => item)
      .map((item) => item.trim().split('-'));

    const storageList = storageRow
      .split('\n')
      .filter((item) => item)
      .map((item) => item.trim().split('-'));

    return JSON.stringify({
      nodes: nodes.map((_, index) => ({
        key: index,
        name: nodesList[0][index],
        number: nodesList[1][index],
      })),
      cores: cores.map((_, index) => ({
        key: index,
        name: coresList[0][index],
        number: coresList[1][index],
      })),
      availableTime: availableTime.map((_, index) => ({
        x: availableTimeList[0][index],
        y: availableTimeList[1][index] * 1,
      })),
      storage: storage.map((_, index) => ({
        x: storageList[0][index],
        y: storageList[1][index] * 1,
      })),
    });
  }
}
