import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ShopsService } from './shops.service'

@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all shops' })
  async findAll() {
    return this.shopsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shop by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopsService.findOne(id)
  }
}
