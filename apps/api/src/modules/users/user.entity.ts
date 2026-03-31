import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { BaseEntity } from '../../common/entities/base.entity'
import { UserRole } from './user-role.enum'
import { CartItem } from '../cart/cart.entity'
import { Order } from '../orders/order.entity'
import { Product } from '../products/product.entity'

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 50 })
  username: string

  @Index()
  @Column({ length: 100, unique: true })
  email: string

  @Column({ length: 255, select: false })
  @Exclude()
  passwordHash: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole

  @Column({ name: 'first_name', length: 50, nullable: true })
  firstName: string

  @Column({ name: 'last_name', length: 50, nullable: true })
  lastName: string

  @Column({ length: 20, nullable: true })
  phone: string

  @Column({ name: 'avatar_url', length: 500, nullable: true })
  avatarUrl: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt: Date

  @OneToMany(() => CartItem, (cart) => cart.user)
  cartItems: CartItem[]

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'user_favorites',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' }
  })
  favorites: Product[]

  @Column({ name: 'refresh_token', select: false, nullable: true })
  @Exclude()
  refreshToken: string

  @Column({ name: 'refresh_token_expires_at', nullable: true })
  refreshTokenExpiresAt: Date
}
