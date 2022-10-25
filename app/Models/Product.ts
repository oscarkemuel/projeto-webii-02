import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Store from './Store'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public category: string

  @column()
  public quantity: number

  @column({ columnName: 'store_id' })
  public storeId: number

  @belongsTo(() => Store, {
    foreignKey: 'storeId',
  })
  public store: BelongsTo<typeof Store>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
