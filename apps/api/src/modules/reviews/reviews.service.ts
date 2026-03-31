import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Review } from './review.entity'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) {}

  async findAll() {
    return this.reviewRepository.find()
  }

  async findByProduct(productId: number) {
    return this.reviewRepository.find({ where: { productId } })
  }
}
