import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Logistics } from './logistics.entity'

@Injectable()
export class LogisticsService {
  constructor(
    @InjectRepository(Logistics)
    private readonly logisticsRepository: Repository<Logistics>
  ) {}

  async findByOrder(orderId: number) {
    return this.logisticsRepository.find({ where: { orderId } })
  }
}
