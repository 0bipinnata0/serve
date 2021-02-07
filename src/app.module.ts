import { HeadService } from './head/head.service';
import { StatisticsService } from './statistics/statistics.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';
import { PedantsTypeModule } from './pedants-type/pedants-type.module';
import { HeadController } from './head/head.controller';
import { StatisticsController } from './statistics/statistics.controller';
import { TasksController } from './tasks/tasks.controller';
import { UsersController } from './users/users.controller';
import { SettingController } from './setting/setting.controller';
import { AboutController } from './about/about.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [PedantsTypeModule],
  controllers: [
    AppController,
    ArticleController,
    HeadController,
    StatisticsController,
    TasksController,
    UsersController,
    SettingController,
    AboutController,
  ],
  providers: [AppService, HeadService, StatisticsService, TasksService],
})
export class AppModule {}
