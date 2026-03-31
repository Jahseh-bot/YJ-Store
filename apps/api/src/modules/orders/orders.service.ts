import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './order.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async findAll() {
    return this.orderRepository.find()
  }

  async findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } })
  }
}
