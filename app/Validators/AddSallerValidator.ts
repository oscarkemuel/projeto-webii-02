import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddSallerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.exists({ table: 'users', column: 'email' }),
    ]),
  })

  public messages: CustomMessages = {
    'email.required': 'Email is required',
    'email.email': 'Email is not valid',
    'email.exists': 'User with this email does not exist',
  }
}
