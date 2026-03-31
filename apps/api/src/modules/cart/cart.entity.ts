import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  Unique
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../users/user.entity'
import { Product } from '../products/product.entity'
import { SKU } from '../products/sku.entity'

@Entity('cart_items')
@Unique(['userId', 'skuId'])
export class CartItem extends BaseEntity {
  @Index()
  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @Index()
  @Column({ name: 'product_id' })
  productId: number

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product?: Product

  @Index()
  @Column({ name: 'sku_id' })
  skuId: number

  @ManyToOne(() => SKU)
  @JoinColumn({ name: 'sku_id' })
  sku?: SKU

  @Column({ type: 'int', default: 1 })
  quantity: number

  @Column({ name: 'is_selected', default: true })
  isSelected: boolean

  @Column({ name: 'added_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date
}
