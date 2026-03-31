import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Shop } from './shop.entity'

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>
  ) {}

  async findAll() {
    return this.shopRepository.find()
  }

  async findOne(id: number) {
    return this.shopRepository.findOne({ where: { id } })
  }
}
