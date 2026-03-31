import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { RegionsService } from './regions.service'

@ApiTags('Regions')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all regions' })
  async findAll() {
    return this.regionsService.findAll()
  }

  @Get('children')
  @ApiOperation({ summary: 'Get child regions' })
  async findChildren(@Query('parentId') parentId: number) {
    return this.regionsService.findChildren(parentId || 0)
  }
}
