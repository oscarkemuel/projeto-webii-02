import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Seller from './Seller'
import Sale from './Sale'
import User from './User'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public description: string

  @column({ columnName: 'owner_id' })
  public ownerId: number

  @belongsTo(() => User, { foreignKey: 'ownerId' })
  public owner: BelongsTo<typeof User>

  @hasMany(() => Product, {
    foreignKey: 'storeId',
  })
  public products: HasMany<typeof Product>

  @manyToMany(() => Seller, {
    pivotTable: 'saller_stores',
    pivotForeignKey: 'store_id',
    pivotRelatedForeignKey: 'seller_id',
  })
  public sellers: ManyToMany<typeof Seller>

  @hasMany(() => Sale, {
    foreignKey: 'storeId',
  })
  public sales: HasMany<typeof Sale>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
