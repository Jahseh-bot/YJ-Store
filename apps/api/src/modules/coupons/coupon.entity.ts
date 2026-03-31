import {
  Entity,
  Column,
  OneToMany,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { UserCoupon } from './user-coupon.entity'

@Entity('coupons')
export class Coupon extends BaseEntity {
  @Column({ length: 100 })
  name: string

  @Column({
    type: 'enum',
    enum: ['fixed', 'percentage'],
    default: 'fixed'
  })
  type: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  denomination: number

  @Column({ name: 'min_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  minAmount: number

  @Column({ name: 'max_discount', type: 'decimal', precision: 10, scale: 2, nullable: true })
  maxDiscount: number

  @Column({ name: 'total_count' })
  totalCount: number

  @Column({ name: 'remain_count' })
  remainCount: number

  @Column({ name: 'per_limit', default: 1 })
  perLimit: number

  @Column({
    type: 'enum',
    enum: ['manual', 'auto', 'gift'],
    default: 'manual'
  })
  receiveType: string

  @Index()
  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date

  @Index()
  @Column({ name: 'end_time', type: 'timestamp' })
  endTime: Date

  @Column({ name: 'valid_days', nullable: true })
  validDays: number

  @Column({
    type: 'enum',
    enum: ['all', 'category', 'product', 'shop'],
    default: 'all'
  })
  scopeType: string

  @Column({ name: 'scope_ids', type: 'text', nullable: true })
  scopeIds: string

  @Index()
  @Column({
    type: 'enum',
    enum: ['pending', 'active', 'paused', 'expired'],
    default: 'pending'
  })
  status: string

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.coupon)
  userCoupons: UserCoupon[]
}
