import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { Product } from '../products/product.entity'

@Entity('categories')
@Tree('materialized-path')
export class Category extends BaseEntity {
  @Column({ name: 'category_name', length: 50 })
  name: string

  @Index()
  @Column({ name: 'parent_id', nullable: true })
  parentId: number

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: Category

  @TreeChildren()
  children: Category[]

  @Column({ name: 'icon_url', length: 500, nullable: true })
  iconUrl: string

  @Column({ length: 500, nullable: true })
  description: string

  @Column({ type: 'int', default: 0 })
  sort: number

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'is_show', default: true })
  isShow: boolean

  @Column({ name: 'level', type: 'int', default: 1 })
  level: number

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}
