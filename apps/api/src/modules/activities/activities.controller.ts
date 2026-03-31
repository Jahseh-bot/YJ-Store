import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ActivitiesService } from './activities.service'

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all activities' })
  async findAll() {
    return this.activitiesService.findAll()
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active activities' })
  async findActive() {
    return this.activitiesService.findActive()
  }
}
