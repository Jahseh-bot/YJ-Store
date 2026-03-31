import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { Order } from '../orders/order.entity'

@Entity('logistics')
export class Logistics extends BaseEntity {
  @Index()
  @Column({ name: 'order_id' })
  orderId: number

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column({ name: 'logistics_company', length: 100 })
  logisticsCompany: string

  @Column({ name: 'tracking_no', length: 50 })
  trackingNo: string

  @Column({
    type: 'enum',
    enum: ['pending', 'in_transit', 'delivering', 'delivered', 'exception'],
    default: 'pending'
  })
  status: string

  @Column({ name: 'current_location', length: 200, nullable: true })
  currentLocation: string

  @Column({ name: 'signed_time', nullable: true })
  signedTime: Date
}

@Entity('logistics_tracks')
export class LogisticsTrack extends BaseEntity {
  @Index()
  @Column({ name: 'logistics_id' })
  logisticsId: number

  @Column({ length: 200 })
  location: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'timestamp' })
  time: Date

  @Column({ name: 'is_current', default: false })
  isCurrent: boolean
}
