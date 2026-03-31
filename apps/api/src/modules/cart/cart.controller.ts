import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common'
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
      userId: 1,
      productId: dto.productId,
      skuId: 1,
      quantity: dto.quantity,
      isSelected: true,
      addedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      user: undefined,
      product: undefined,
      sku: undefined
    }
    this.items.push(item)
    return item
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from cart' })
  remove(@Param('id', ParseIntPipe) id: number): boolean {
    const index = this.items.findIndex(i => i.id === id)
    if (index > -1) {
      this.items.splice(index, 1)
      return true
    }
    return false
  }
}
