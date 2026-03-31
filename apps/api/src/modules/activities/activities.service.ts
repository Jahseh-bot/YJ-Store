import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Activity } from './activity.entity'

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>
  ) {}

  async findAll() {
    return this.activityRepository.find()
  }

  async findActive() {
    return this.activityRepository.find({
      where: { status: 'active' }
    })
  }
}
