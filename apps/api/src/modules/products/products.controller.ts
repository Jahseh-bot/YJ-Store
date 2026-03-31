import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Product } from './product.entity'
import { ProductStatus } from './product-status.enum'
import { CreateProductDto, UpdateProductDto } from './products.dto'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  private products: Product[] = [
    {
      id: 1,
      name: 'Sample Product 1',
      subtitle: 'This is a sample product',
      description: 'This is a sample product description',
      categoryId: 1,
      brandId: 1,
      brandName: 'Sample Brand',
      status: ProductStatus.ON_SALE,
      sellerId: 1,
      reviewCount: 0,
      reviewScore: 0,
      viewCount: 0,
      salesCount: 0,
      isDeleted: false,
      freightTemplateId: 1,
      sevenDayReturn: true,
      warrantyYear: 1,
      detailHtml: '<p>Product details</p>',
      mobileDetailHtml: '<p>Product details</p>',
      skus: [],
      images: [],
      specifications: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      category: undefined
    },
    {
      id: 2,
      name: 'Sample Product 2',
      subtitle: 'This is another sample product',
      description: 'This is another sample product description',
      categoryId: 1,
      brandId: 1,
      brandName: 'Sample Brand',
      status: ProductStatus.ON_SALE,
      sellerId: 1,
      reviewCount: 0,
      reviewScore: 0,
      viewCount: 0,
      salesCount: 0,
      isDeleted: false,
      freightTemplateId: 1,
      sevenDayReturn: true,
      warrantyYear: 1,
      detailHtml: '<p>Product details</p>',
      mobileDetailHtml: '<p>Product details</p>',
      skus: [],
      images: [],
      specifications: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      category: undefined
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
      name: dto.name,
      subtitle: undefined,
      description: dto.description,
      categoryId: dto.categoryId,
      brandId: undefined,
      brandName: undefined,
      status: ProductStatus.DRAFT,
      sellerId: 1,
      reviewCount: 0,
      reviewScore: 0,
      viewCount: 0,
      salesCount: 0,
      isDeleted: false,
      freightTemplateId: undefined,
      sevenDayReturn: true,
      warrantyYear: 0,
      detailHtml: undefined,
      mobileDetailHtml: undefined,
      skus: [],
      images: [],
      specifications: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      category: undefined
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
