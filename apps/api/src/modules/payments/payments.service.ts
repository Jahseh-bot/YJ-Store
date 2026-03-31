import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Payment } from './payment.entity'

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) {}

  async findAll() {
    return this.paymentRepository.find()
  }

  async findByOrder(orderId: number) {
    return this.paymentRepository.find({ where: { orderId } })
  }
}
