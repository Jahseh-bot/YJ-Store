import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../users/user.entity'
import { Product } from '../products/product.entity'
import { OrderItem } from '../orders/order-item.entity'

@Entity('reviews')
export class Review extends BaseEntity {
  @Index()
  @Column({ name: 'order_id' })
  orderId: number

  @Index()
  @Column({ name: 'order_item_id' })
  orderItemId: number

  @ManyToOne(() => OrderItem)
  @JoinColumn({ name: 'order_item_id' })
  orderItem: OrderItem

  @Index()
  @Column({ name: 'product_id' })
  productId: number

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Index()
  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'int' })
  score: number

  @Column({ type: 'text', nullable: true })
  content: string

  @Column({ type: 'jsonb', nullable: true })
  images: string[]

  @Column({ name: 'video_url', length: 500, nullable: true })
  videoUrl: string

  @Column({ name: 'is_anonymous', default: false })
  isAnonymous: boolean

  @Column({ name: 'is_append', default: false })
  isAppend: boolean

  @Column({ name: 'append_content', type: 'text', nullable: true })
  appendContent: string

  @Column({ name: 'append_images', type: 'jsonb', nullable: true })
  appendImages: string[]

  @Column({ name: 'append_time', nullable: true })
  appendTime: Date

  @Column({ name: 'seller_reply', type: 'text', nullable: true })
  sellerReply: string

  @Column({ name: 'seller_reply_time', nullable: true })
  sellerReplyTime: Date

  @Column({ name: 'like_count', default: 0 })
  likeCount: number
}
