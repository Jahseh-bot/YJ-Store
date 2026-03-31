import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'

@Entity('ad_positions')
export class AdPosition extends BaseEntity {
  @Column({ length: 100 })
  name: string

  @Column({ length: 50, unique: true })
  code: string

  @Column()
  width: number

  @Column()
  height: number

  @Column({ length: 500, nullable: true })
  description: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean
}

@Entity('ads')
export class Ad extends BaseEntity {
  @Index()
  @Column({ name: 'position_id' })
  positionId: number

  @ManyToOne(() => AdPosition)
  @JoinColumn({ name: 'position_id' })
  position: AdPosition

  @Column({ length: 100 })
  name: string

  @Column({ name: 'image_url', length: 500 })
  imageUrl: string

  @Column({
    type: 'enum',
    enum: ['url', 'product', 'category', 'activity'],
    default: 'url'
  })
  linkType: string

  @Column({ name: 'link_url', length: 500, nullable: true })
  linkUrl: string

  @Column({ name: 'link_product_id', nullable: true })
  linkProductId: number

  @Column({ name: 'link_category_id', nullable: true })
  linkCategoryId: number

  @Index()
  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date

  @Index()
  @Column({ name: 'end_time', type: 'timestamp' })
  endTime: Date

  @Column({ default: 0 })
  sort: number

  @Column({ name: 'click_count', default: 0 })
  clickCount: number

  @Index()
  @Column({
    type: 'enum',
    enum: ['pending', 'active', 'paused', 'finished'],
    default: 'pending'
  })
  status: string
}
