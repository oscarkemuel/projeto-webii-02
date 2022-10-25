import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Store from './Store'
import Seller from './Seller'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public productId: number

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  public product: BelongsTo<typeof Product>

  @column()
  public quantity: number

  @column()
  public storeId: number

  @belongsTo(() => Store, {
    foreignKey: 'storeId',
  })
  public store: BelongsTo<typeof Store>

  @column()
  public sellerId: number

  @belongsTo(() => Seller, {
    foreignKey: 'sellerId',
  })
  public seller: BelongsTo<typeof Seller>

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
