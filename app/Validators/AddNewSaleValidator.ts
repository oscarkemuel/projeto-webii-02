import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddSaleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    productId: schema.number([rules.exists({ table: 'products', column: 'id' })]),
    sellerId: schema.number([rules.exists({ table: 'sellers', column: 'id' })]),
    quantity: schema.number(),
  })

  public messages: CustomMessages = {
    'productId.exists': 'Product not found',
    'sellerId.exists': 'Seller not found',
    'productId.required': 'Product is required',
    'sellerId.required': 'Seller is required',
  }
}
