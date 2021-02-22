import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
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
