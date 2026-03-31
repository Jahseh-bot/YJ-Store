import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, TreeRepository } from 'typeorm'
import { Category } from './category.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>
  ) {}

  async findAll() {
    return this.categoryRepository.find({ order: { sort: 'ASC', createdAt: 'DESC' } })
  }

  async findTree() {
    return this.categoryRepository.findTrees()
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } })
  }
}
