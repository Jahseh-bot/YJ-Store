import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CartItem } from './cart.entity'
import { AddToCartDto } from './cart.dto'

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  private items: CartItem[] = []

  @Get()
  @ApiOperation({ summary: 'Get cart items' })
  findAll(): CartItem[] {
    return this.items
  }

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  add(@Body() dto: AddToCartDto): CartItem {
    const existing = this.items.find(i => i.productId === dto.productId)
    if (existing) {
      existing.quantity += dto.quantity
      return existing
    }
    const item: CartItem = {
      id: this.items.length + 1,
      ...dto
    }
    this.items.push(item)
    return item
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from cart' })
  remove(@Param('id') id: string): boolean {
    const index = this.items.findIndex(i => i.id === parseInt(id))
    if (index > -1) {
      this.items.splice(index, 1)
      return true
    }
    return false
  }
}
