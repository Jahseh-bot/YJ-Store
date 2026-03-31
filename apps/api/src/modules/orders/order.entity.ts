import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../users/user.entity'
import { OrderStatus } from './order-status.enum'
import { OrderItem } from './order-item.entity'
import { Address } from '../addresses/address.entity'

@Entity('orders')
export class Order extends BaseEntity {
  @Index()
  @Column({ name: 'order_no', length: 32, unique: true })
  orderNo: string

  @Index()
  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'seller_id' })
  sellerId: number

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING_PAYMENT
  })
  status: OrderStatus

  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number

  @Column({ name: 'freight_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  freightAmount: number

  @Column({ name: 'discount_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number

  @Column({ name: 'point_deduction', type: 'decimal', precision: 10, scale: 2, default: 0 })
  pointDeduction: number

  @Column({ name: 'coupon_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  couponAmount: number

  @Column({ name: 'pay_amount', type: 'decimal', precision: 12, scale: 2 })
  payAmount: number

  @Column({
    name: 'pay_method',
    type: 'enum',
    enum: ['wechat', 'alipay', 'card', 'wallet'],
    nullable: true
  })
  payMethod: string

  @Column({ name: 'pay_time', nullable: true })
  payTime: Date

  @Column({ name: 'delivery_time', nullable: true })
  deliveryTime: Date

  @Column({ name: 'receive_time', nullable: true })
  receiveTime: Date

  @Column({ name: 'address_id' })
  addressId: number

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address

  @Column({ name: 'receiver_name', length: 50 })
  receiverName: string

  @Column({ name: 'receiver_phone', length: 20 })
  receiverPhone: string

  @Column({ name: 'receiver_address', length: 500 })
  receiverAddress: string

  @Column({ name: 'buyer_remark', length: 500, nullable: true })
  buyerRemark: string

  @Column({ name: 'seller_remark', length: 500, nullable: true })
  sellerRemark: string

  @Column({ name: 'logistics_company', length: 100, nullable: true })
  logisticsCompany: string

  @Column({ name: 'tracking_no', length: 50, nullable: true })
  trackingNo: string

  @Column({
    name: 'invoice_type',
    type: 'enum',
    enum: ['none', 'electronic', 'paper'],
    default: 'none'
  })
  invoiceType: string

  @Column({ name: 'invoice_title', length: 200, nullable: true })
  invoiceTitle: string

  @Column({ name: 'invoice_content', length: 200, nullable: true })
  invoiceContent: string

  @Column({ name: 'tax_id', length: 50, nullable: true })
  taxId: string

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[]

  @Column({ name: 'source', length: 20, default: 'web' })
  source: string
}
