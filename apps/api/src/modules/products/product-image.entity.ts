import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { Product } from './product.entity'

@Entity('product_images')
export class ProductImage extends BaseEntity {
  @Index()
  @Column({ name: 'product_id' })
  productId: number

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'image_url', length: 500 })
  imageUrl: string

  @Column({ name: 'thumbnail_url', length: 500, nullable: true })
  thumbnailUrl: string

  @Column({ type: 'int', default: 0 })
  sort: number

  @Column({ name: 'is_main', default: false })
  isMain: boolean

  @Column({ name: 'alt_text', length: 200, nullable: true })
  altText: string
}
