import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateSaleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    productId: schema.number([rules.exists({ table: 'products', column: 'id' })]),
    sellerId: schema.number([rules.exists({ table: 'sellers', column: 'id' })]),
    quantity: schema.number(),
    storeId: schema.number([rules.exists({ table: 'stores', column: 'id' })]),
    price: schema.number()
  })

  public messages: CustomMessages = {}
}
