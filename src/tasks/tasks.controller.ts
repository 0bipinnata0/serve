import { Controller, Get, Query, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('getTasks')
  getTasks(@Headers('token') token: string): Promise<string> {
    return this.tasksService.getTasks(token);
  }

  @Get('deleteTask')
  deleteTask(
    @Query('id') id: string,
    @Headers('token') token: string,
  ): Promise<string> {
    return this.tasksService.deleteTask(id, token);
  }
}
