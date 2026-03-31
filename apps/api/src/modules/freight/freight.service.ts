import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FreightTemplate } from './freight.entity'

@Injectable()
export class FreightService {
  constructor(
    @InjectRepository(FreightTemplate)
    private readonly freightRepository: Repository<FreightTemplate>
  ) {}

  async findAll() {
    return this.freightRepository.find()
  }

  async findBySeller(sellerId: number) {
    return this.freightRepository.find({ where: { sellerId } })
  }
}
