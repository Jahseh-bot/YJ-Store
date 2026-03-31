import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Logistics, LogisticsTrack } from './logistics.entity'
import { LogisticsService } from './logistics.service'
import { LogisticsController } from './logistics.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Logistics, LogisticsTrack])],
  controllers: [LogisticsController],
  providers: [LogisticsService],
  exports: [LogisticsService]
})
export class LogisticsModule {}
