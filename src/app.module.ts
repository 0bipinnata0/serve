import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';
import { PedantsTypeModule } from './pedants-type/pedants-type.module';

@Module({
  imports: [PedantsTypeModule],
  controllers: [AppController, ArticleController],
  providers: [AppService],
})
export class AppModule {}
