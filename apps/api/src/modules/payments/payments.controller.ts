import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { PaymentsService } from './payments.service'

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  async findAll() {
    return this.paymentsService.findAll()
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get payments by order ID' })
  async findByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.paymentsService.findByOrder(orderId)
  }
}
