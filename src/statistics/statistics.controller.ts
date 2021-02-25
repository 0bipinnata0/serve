import { Controller, Get, Query, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
@UseGuards(AuthGuard('jwt'))
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics(
    @Query('type') type = 'second',
    @Headers('token') token: string,
  ): Promise<{ data: string }> {
    return this.statisticsService.getStatistics(type, token);
  }
}
