import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../users/user.entity'

@Entity('shops')
export class Shop extends BaseEntity {
  @Index()
  @Column({ name: 'user_id', unique: true })
  userId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ length: 100 })
  name: string

  @Column({ name: 'logo_url', length: 500, nullable: true })
  logoUrl: string

  @Column({ name: 'banner_url', length: 500, nullable: true })
  bannerUrl: string

  @Column({ length: 1000, nullable: true })
  description: string

  @Column({ name: 'main_business', length: 200, nullable: true })
  mainBusiness: string

  @Column({ name: 'contact_phone', length: 20, nullable: true })
  contactPhone: string

  @Column({ length: 20, nullable: true })
  province: string

  @Column({ length: 20, nullable: true })
  city: string

  @Column({ length: 20, nullable: true })
  district: string

  @Column({ length: 500, nullable: true })
  address: string

  @Column({ name: 'business_license_url', length: 500, nullable: true })
  businessLicenseUrl: string

  @Column({ name: 'id_card_front_url', length: 500, nullable: true })
  idCardFrontUrl: string

  @Column({ name: 'id_card_back_url', length: 500, nullable: true })
  idCardBackUrl: string

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected', 'closed'],
    default: 'pending'
  })
  status: string

  @Column({ name: 'review_score', type: 'decimal', precision: 2, scale: 1, default: 0 })
  reviewScore: number

  @Column({ name: 'review_count', default: 0 })
  reviewCount: number

  @Column({ name: 'total_sales', default: 0 })
  totalSales: number
}
