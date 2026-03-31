import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'

@Entity('freight_templates')
export class FreightTemplate extends BaseEntity {
  @Index()
  @Column({ name: 'seller_id' })
  sellerId: number

  @Column({ length: 100 })
  name: string

  @Column({ name: 'dispatch_time', default: 1 })
  dispatchTime: number

  @Column({ name: 'is_free', default: false })
  isFree: boolean

  @Column({ name: 'free_condition', type: 'decimal', precision: 10, scale: 2, nullable: true })
  freeCondition: number

  @OneToMany(() => FreightTemplateItem, (item) => item.template)
  items: FreightTemplateItem[]
}

@Entity('freight_template_items')
export class FreightTemplateItem extends BaseEntity {
  @Column({ name: 'template_id' })
  templateId: number

  @ManyToOne(() => FreightTemplate, (template) => template.items)
  @JoinColumn({ name: 'template_id' })
  template: FreightTemplate

  @Column({ name: 'region_ids', type: 'text' })
  regionIds: string

  @Column({ name: 'first_unit', default: 1 })
  firstUnit: number

  @Column({ name: 'first_price', type: 'decimal', precision: 10, scale: 2, default: 0 })
  firstPrice: number

  @Column({ name: 'continue_unit', default: 1 })
  continueUnit: number

  @Column({ name: 'continue_price', type: 'decimal', precision: 10, scale: 2, default: 0 })
  continuePrice: number
}
