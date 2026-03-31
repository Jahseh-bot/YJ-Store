import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Product } from './product.entity'
import { CreateProductDto, UpdateProductDto } from './products.dto'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  private products: Product[] = [
    {
      id: 1,
      name: 'Sample Product 1',
      description: 'This is a sample product',
      price: 99.99,
      image: 'https://via.placeholder.com/300',
      stock: 10,
      categoryId: 1
    },
    {
      id: 2,
      name: 'Sample Product 2',
      description: 'This is another sample product',
      price: 149.99,
      image: 'https://via.placeholder.com/300',
      stock: 5,
      categoryId: 1
    }
  ]
  private nextId = 3

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(): Product[] {
    return this.products
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Product | undefined {
    return this.products.find(p => p.id === id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() dto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId++,
      ...dto
    }
    this.products.push(product)
    return product
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto
  ): Product | undefined {
    const index = this.products.findIndex(p => p.id === id)
    if (index > -1) {
      this.products[index] = { ...this.products[index], ...dto }
      return this.products[index]
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  delete(@Param('id', ParseIntPipe) id: number): boolean {
    const index = this.products.findIndex(p => p.id === id)
    if (index > -1) {
      this.products.splice(index, 1)
      return true
    }
    return false
  }
}
