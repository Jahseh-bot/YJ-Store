import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Activity } from './activity.entity'
import { ActivityProduct } from './activity-product.entity'
import { ActivitiesService } from './activities.service'
import { ActivitiesController } from './activities.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Activity, ActivityProduct])],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService]
})
export class ActivitiesModule {}
