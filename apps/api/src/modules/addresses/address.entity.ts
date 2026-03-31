import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../users/user.entity'

@Entity('addresses')
export class Address extends BaseEntity {
  @Index()
  @Column({ name: 'user_id' })
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'receiver_name', length: 50 })
  receiverName: string

  @Column({ name: 'phone', length: 20 })
  phone: string

  @Column({ length: 20, nullable: true })
  province: string

  @Column({ length: 20, nullable: true })
  city: string

  @Column({ length: 20, nullable: true })
  district: string

  @Column({ name: 'street', length: 200, nullable: true })
  street: string

  @Column({ name: 'address', length: 500 })
  address: string

  @Column({ name: 'postal_code', length: 10, nullable: true })
  postalCode: string

  @Column({ name: 'is_default', default: false })
  isDefault: boolean

  @Column({ name: 'tag', length: 20, nullable: true })
  tag: string
}
