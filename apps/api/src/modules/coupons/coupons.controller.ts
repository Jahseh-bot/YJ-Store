import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CouponsService } from './coupons.service'

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all coupons' })
  async findAll() {
    return this.couponsService.findAll()
  }

  @Get('available')
  @ApiOperation({ summary: 'Get available coupons' })
  async findAvailable() {
    return this.couponsService.findAvailable()
  }
}
