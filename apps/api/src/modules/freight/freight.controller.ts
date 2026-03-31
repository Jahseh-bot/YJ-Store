import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { FreightService } from './freight.service'

@ApiTags('Freight')
@Controller('freight')
export class FreightController {
  constructor(private readonly freightService: FreightService) {}

  @Get()
  @ApiOperation({ summary: 'Get all freight templates' })
  async findAll() {
    return this.freightService.findAll()
  }

  @Get('seller/:sellerId')
  @ApiOperation({ summary: 'Get freight templates by seller' })
  async findBySeller(@Param('sellerId', ParseIntPipe) sellerId: number) {
    return this.freightService.findBySeller(sellerId)
  }
}
