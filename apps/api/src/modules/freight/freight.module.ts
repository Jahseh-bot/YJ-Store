import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FreightTemplate, FreightTemplateItem } from './freight.entity'
import { FreightService } from './freight.service'
import { FreightController } from './freight.controller'

@Module({
  imports: [TypeOrmModule.forFeature([FreightTemplate, FreightTemplateItem])],
  controllers: [FreightController],
  providers: [FreightService],
  exports: [FreightService]
})
export class FreightModule {}
