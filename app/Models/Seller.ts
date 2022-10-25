import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Store from './Store'

export default class Seller extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id' })
  public userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Store, {
    pivotTable: 'saller_stores',
    pivotForeignKey: 'seller_id',
    pivotRelatedForeignKey: 'store_id',
  })
  public stores: ManyToMany<typeof Store>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
