import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdPosition, Ad } from './ad.entity'

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad)
    private readonly adRepository: Repository<Ad>,
    @InjectRepository(AdPosition)
    private readonly adPositionRepository: Repository<AdPosition>
  ) {}

  async findAll() {
    return this.adRepository.find()
  }

  async findActive() {
    return this.adRepository.find({
      where: { status: 'active' }
    })
  }
}
