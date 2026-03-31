import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../users/user.entity'
import { Order } from '../orders/order.entity'

@Entity('payments')
export class Payment extends BaseEntity {
  @Index()
  @Column({ name: 'payment_no', length: 64, unique: true })
  paymentNo: string

  @Index()
  @Column({ name: 'order_id' })
  orderId: number

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Index()
  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'amount', type: 'decimal', precision: 12, scale: 2 })
  amount: number

  @Column({
    type: 'enum',
    enum: ['wechat', 'alipay', 'card', 'wallet'],
    default: 'wechat'
  })
  method: string

  @Column({
    type: 'enum',
    enum: ['pending', 'paid', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  })
  status: string

  @Column({ name: 'paid_time', nullable: true })
  paidTime: Date

  @Column({ name: 'transaction_id', length: 64, nullable: true })
  transactionId: string

  @Column({ name: 'callback_data', type: 'jsonb', nullable: true })
  callbackData: Record<string, any>

  @Column({ name: 'fail_reason', length: 500, nullable: true })
  failReason: string
}
