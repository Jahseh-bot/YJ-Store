import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { Order } from './order.entity'
import { Product } from '../products/product.entity'
import { SKU } from '../products/sku.entity'

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Index()
  @Column({ name: 'order_id' })
  orderId: number

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order

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

  @Column({ name: 'product_name', length: 200 })
  productName: string

  @Column({ name: 'sku_specs', type: 'jsonb', nullable: true })
  skuSpecs: Record<string, string>

  @Column({ name: 'product_image', length: 500 })
  productImage: string

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({ name: 'original_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
  originalPrice: number

  @Column({ type: 'int' })
  quantity: number

  @Column({ name: 'subtotal', type: 'decimal', precision: 10, scale: 2 })
  subtotal: number

  @Column({ name: 'discount_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number

  @Column({ name: 'is_reviewed', default: false })
  isReviewed: boolean
}
