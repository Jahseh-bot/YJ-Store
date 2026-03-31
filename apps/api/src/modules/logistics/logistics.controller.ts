import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { LogisticsService } from './logistics.service'

@ApiTags('Logistics')
@Controller('logistics')
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get logistics by order ID' })
  async findByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.logisticsService.findByOrder(orderId)
  }
}
