import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { FreightTemplate } from './freight.entity'

@Entity('freight_template_items')
export class FreightTemplateItem extends BaseEntity {
  @Index()
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
