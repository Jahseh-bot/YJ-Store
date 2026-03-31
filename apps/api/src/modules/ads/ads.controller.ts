import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { AdsService } from './ads.service'

@ApiTags('Ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all ads' })
  async findAll() {
    return this.adsService.findAll()
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active ads' })
  async findActive() {
    return this.adsService.findActive()
  }
}
