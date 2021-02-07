import { AppService } from './../app.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(private readonly appService: AppService) {}

  STATUS = {
    R: '0',
    PD: '1',
    S: '2',
  };

  reg = /\s+/g;

  getHours(times, pattern) {
    let hours = 0;
    let output = 0;
    times.forEach(({ TIME }) => {
      let seconds = 0;
      let timeArr = TIME.split('-');
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
      hours = hours + Math.ceil(seconds / 3600);
      output = output + seconds;
    });
    if (pattern === 's') {
      return output;
    }
    return hours;
  }

  createArr(squeue) {
    const squeueArr = squeue.split('\n').filter((item) => item);
    const title = squeueArr.shift();
    const titleArr = [];
    title
      .replace(this.reg, ' ')
      .split(' ')
      .forEach((item) => {
        if (item) {
          titleArr.push(item);
        }
      });
    const objArr = [];
    squeueArr.forEach((squeueItem) => {
      let objItem = void 0;
      let index = 0;
      squeueItem
        .replace(this.reg, ' ')
        .split(' ')
        .forEach((item) => {
          if (item) {
            if (!objItem) objItem = {};
            objItem[titleArr[index++]] = item;
          }
        });
      objItem && objArr.push(objItem);
    });
    return objArr;
  }

  async getTasks(): Promise<string> {
    const ssh = this.appService.getSSh();
    const data = await ssh.exec("./Findmyjobs;echo '**********';squeue");
    const orderArr = data.split('**********');
    const taskItem = orderArr[0];
    const tasksArr = taskItem
      .split('\n')
      .map((item) => item.split('\t').map((i) => i.trim()))
      .filter((item) => item.length === 3);

    const squeue = this.createArr(orderArr[1]);
    const squeueIdMap = {};
    squeue.forEach((item) => (squeueIdMap[item.JOBID] = item));
    const taskFormat = tasksArr.map((taskItem) => {
      const tasks_pid = squeueIdMap[taskItem[0]];
      return [
        taskItem[0],
        taskItem[1].split('=')[1],
        tasks_pid.USER,
        this.getHours([tasks_pid], 's'),
        tasks_pid.ST,
        taskItem[2].split('=')[1],
      ];
    });
    const taskObj = taskFormat.map((item, index) => ({
      key: index,
      id: item[0],
      location: item[1],
      user: item[2],
      spend_time: item[3],
      status: this.STATUS[item[4]],
      create_time: item[5].includes('T') ? item[5].replace('T', ' ') : '',
    }));
    return JSON.stringify({ data: taskObj });
  }
}
