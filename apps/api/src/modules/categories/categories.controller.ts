import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CategoriesService } from './categories.service'

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  async findAll() {
    return this.categoriesService.findAll()
  }

  @Get('tree')
  @ApiOperation({ summary: 'Get category tree' })
  async findTree() {
    return this.categoriesService.findTree()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id)
  }
}
