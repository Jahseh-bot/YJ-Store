import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../users/user.entity'
import { Coupon } from './coupon.entity'

@Entity('user_coupons')
export class UserCoupon extends BaseEntity {
  @Index()
  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Index()
  @Column({ name: 'coupon_id' })
  couponId: number

  @ManyToOne(() => Coupon, (coupon) => coupon.userCoupons)
  @JoinColumn({ name: 'coupon_id' })
  coupon: Coupon

  @Column({ name: 'order_id', nullable: true })
  orderId: number

  @Index()
  @Column({
    type: 'enum',
    enum: ['unused', 'used', 'expired'],
    default: 'unused'
  })
  status: string

  @Column({ name: 'receive_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  receiveTime: Date

  @Column({ name: 'used_time', nullable: true })
  usedTime: Date

  @Index()
  @Column({ name: 'expire_time', type: 'timestamp' })
  expireTime: Date
}
