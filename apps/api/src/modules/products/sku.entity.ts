import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { Product } from './product.entity'

@Entity('skus')
export class SKU extends BaseEntity {
  @Index()
  @Column({ name: 'product_id' })
  productId: number

  @ManyToOne(() => Product, (product) => product.skus)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'sku_code', length: 100, unique: true })
  skuCode: string

  @Column({ name: 'barcode', length: 100, nullable: true })
  barcode: string

  @Column({ type: 'jsonb', nullable: true })
  specifications: Record<string, string>

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({ name: 'original_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
  originalPrice: number

  @Column({ type: 'int', default: 0 })
  stock: number

  @Column({ name: 'low_stock_warning', type: 'int', default: 10 })
  lowStockWarning: number

  @Column({ name: 'sales_count', type: 'int', default: 0 })
  salesCount: number

  @Column({ name: 'weight', type: 'decimal', precision: 8, scale: 2, nullable: true })
  weight: number

  @Column({ name: 'volume', type: 'decimal', precision: 8, scale: 2, nullable: true })
  volume: number

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active'
  })
  status: string

  @Column({ name: 'sku_images', type: 'jsonb', nullable: true })
  images: string[]
}
