import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { Activity } from './activity.entity'
import { Product } from '../products/product.entity'
import { SKU } from '../products/sku.entity'

@Entity('activity_products')
export class ActivityProduct extends BaseEntity {
  @Index()
  @Column({ name: 'activity_id' })
  activityId: number

  @ManyToOne(() => Activity, (activity) => activity.activityProducts)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity

  @Index()
  @Column({ name: 'product_id' })
  productId: number

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'sku_id' })
  skuId: number

  @ManyToOne(() => SKU)
  @JoinColumn({ name: 'sku_id' })
  sku: SKU

  @Column({ name: 'activity_price', type: 'decimal', precision: 10, scale: 2 })
  activityPrice: number

  @Column()
  stock: number

  @Column({ name: 'sold_count', default: 0 })
  soldCount: number

  @Column({ name: 'max_per_user', default: 1 })
  maxPerUser: number

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  })
  status: string
}
