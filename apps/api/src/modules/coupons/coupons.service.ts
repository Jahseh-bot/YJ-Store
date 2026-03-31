import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Coupon } from './coupon.entity'
import { UserCoupon } from './user-coupon.entity'

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(UserCoupon)
    private readonly userCouponRepository: Repository<UserCoupon>
  ) {}

  async findAll() {
    return this.couponRepository.find()
  }

  async findAvailable() {
    return this.couponRepository.find({
      where: { status: 'active' }
    })
  }
}
