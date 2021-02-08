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
import { SettingController } from './setting/setting.controller';
import { AboutController } from './about/about.controller';
import { TasksService } from './tasks/tasks.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PedantsTypeModule, AuthModule, UserModule],
  controllers: [
    AppController,
    ArticleController,
    HeadController,
    StatisticsController,
    TasksController,
    SettingController,
    AboutController,
  ],
  providers: [AppService, HeadService, StatisticsService, TasksService],
})
export class AppModule {}
