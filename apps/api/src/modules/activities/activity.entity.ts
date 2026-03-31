import {
  Entity,
  Column,
  OneToMany,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { ActivityProduct } from './activity-product.entity'

@Entity('activities')
export class Activity extends BaseEntity {
  @Column({ length: 200 })
  name: string

  @Index()
  @Column({
    type: 'enum',
    enum: ['seckill', 'flash_deal', 'full_reduce', 'group_buy', 'new_user'],
    default: 'seckill'
  })
  type: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ name: 'banner_url', length: 500, nullable: true })
  bannerUrl: string

  @Index()
  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date

  @Index()
  @Column({ name: 'end_time', type: 'timestamp' })
  endTime: Date

  @Column({ name: 'enroll_start_time', type: 'timestamp', nullable: true })
  enrollStartTime: Date

  @Column({ name: 'enroll_end_time', type: 'timestamp', nullable: true })
  enrollEndTime: Date

  @Column({ name: 'rule_config', type: 'jsonb', nullable: true })
  ruleConfig: Record<string, any>

  @Index()
  @Column({
    type: 'enum',
    enum: ['pending', 'enrolling', 'active', 'paused', 'finished'],
    default: 'pending'
  })
  status: string

  @OneToMany(() => ActivityProduct, (ap) => ap.activity)
  activityProducts: ActivityProduct[]
}
