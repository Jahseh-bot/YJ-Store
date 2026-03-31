import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { Category } from '../categories/category.entity'
import { ProductStatus } from './product-status.enum'
import { SKU } from './sku.entity'
import { ProductImage } from './product-image.entity'

@Entity('products')
export class Product extends BaseEntity {
  @Column({ name: 'product_name', length: 200 })
  name: string

  @Index()
  @Column({ name: 'subtitle', length: 500, nullable: true })
  subtitle: string

  @Column({ type: 'text', nullable: true })
  description: string

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Index()
  @Column({ name: 'category_id' })
  categoryId: number

  @Column({ name: 'brand_id', nullable: true })
  brandId: number

  @Column({ name: 'brand_name', length: 100, nullable: true })
  brandName: string

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT
  })
  status: ProductStatus

  @Column({ name: 'seller_id' })
  sellerId: number

  @Column({ name: 'review_count', default: 0 })
  reviewCount: number

  @Column({ name: 'review_score', type: 'decimal', precision: 2, scale: 1, default: 0 })
  reviewScore: number

  @Column({ name: 'view_count', default: 0 })
  viewCount: number

  @Column({ name: 'sales_count', default: 0 })
  salesCount: number

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean

  @Column({ name: 'freight_template_id', nullable: true })
  freightTemplateId: number

  @Column({ name: 'seven_day_return', default: true })
  sevenDayReturn: boolean

  @Column({ name: 'warranty_year', default: 0 })
  warrantyYear: number

  @Column({ name: 'detail_html', type: 'text', nullable: true })
  detailHtml: string

  @Column({ name: 'mobile_detail_html', type: 'text', nullable: true })
  mobileDetailHtml: string

  @OneToMany(() => SKU, (sku) => sku.product, { cascade: true })
  skus: SKU[]

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[]

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'product_specs',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' }
  })
  specifications: Category[]
}
