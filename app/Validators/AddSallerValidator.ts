import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddSallerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'userId.exists': 'User not found',
    'userId.required': 'User is required',
  }
}
