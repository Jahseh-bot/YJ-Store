import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'

@Entity('regions')
export class Region extends BaseEntity {
  @Index()
  @Column({ name: 'parent_id', nullable: true })
  parentId: number

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'parent_id' })
  parent: Region

  @Column({ length: 100 })
  name: string

  @Column({ type: 'int', default: 1 })
  level: number

  @Column({ length: 20, nullable: true })
  code: string
}
