import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { ReviewsService } from './reviews.service'

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  async findAll() {
    return this.reviewsService.findAll()
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get reviews by product ID' })
  async findByProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.findByProduct(productId)
  }
}
