import { AppService } from './../app.service';
import { Injectable } from '@nestjs/common';
import { createScript } from 'src/utils/connectHelp';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TasksService {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  STATUS = {
    R: '0',
    PD: '1',
    S: '2',
  };

  getHours(times) {
    let result = 0;
    let seconds = 0;
    let timeArr = times.split('-');
    if (timeArr.length > 1) {
      const days = timeArr.shift();
      seconds = days * 24 * 60 * 60;
    }
    timeArr = timeArr[0].split(':');
    let unit = 1;
    while (timeArr.length > 0) {
      const times = timeArr.pop();
      seconds = seconds + times * unit;
      unit = unit * 60;
    }
    result = result + seconds;
    return result;
  }

  async getTasks(token: string): Promise<string> {
    const { account } = <Record<string, string>>this.jwtService.decode(token);
    const ssh = this.appService.getSSh();

    const tasksOri = await ssh.exec(createScript('tasks', account));

    const taskList = tasksOri
      .split('\n')
      .filter((item) => item)
      .map((item) => item.trim().split('**'));

    const taskObj = taskList.map((item, index) => ({
      key: index,
      id: item[0],
      location: item[1],
      user: item[2],
      spend_time: this.getHours(item[3]),
      status: item[4],
      create_time: item[5],
    }));
    return JSON.stringify({ data: taskObj });
  }

  async deleteTask(id: string, token: string): Promise<string> {
    const ssh = this.appService.getSSh();
    const data = await ssh.exec(createScript('deleteTask'));
    console.log('data', data, '-', id);
    return await this.getTasks(token);
  }
}
