import { Controller, Get, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('getTasks')
  getTasks(): Promise<string> {
    return this.tasksService.getTasks();
  }

  @Get('deleteTask')
  deleteTask(@Query('id') id: string): Promise<string> {
    return this.tasksService.deleteTask(id);
  }
}
