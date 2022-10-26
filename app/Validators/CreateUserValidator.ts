import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    phone: schema.string({ trim: true }, [
      rules.minLength(10),
      rules.maxLength(15),
      rules.unique({ table: 'users', column: 'phone' }),
    ]),
    password: schema.string({ trim: true }, [
      rules.confirmed(),
      rules.minLength(6),
      rules.maxLength(255),
    ]),
  })

  public messages: CustomMessages = {
    'password.confirmed': 'The password confirmation does not match',
  }
}
