import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    description: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    price: schema.number(),
    category: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    quantity: schema.number(),
    storeId: schema.number([rules.exists({ table: 'stores', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required',
    'name.minLength': 'Name is too short',
    'name.maxLength': 'Name is too long',
    'description.required': 'Description is required',
    'description.minLength': 'Description is too short',
    'description.maxLength': 'Description is too long',
    'price.required': 'Price is required',
    'category.required': 'Category is required',
    'category.minLength': 'Category is too short',
    'category.maxLength': 'Category is too long',
    'quantity.required': 'Quantity is required',
    'storeId.required': 'Store is required',
    'storeId.exists': 'Store does not exist',
  }
}
