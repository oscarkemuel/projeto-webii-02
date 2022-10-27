import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    phone: schema.string.optional({ trim: true }, [
      rules.minLength(10),
      rules.maxLength(15),
      rules.unique({ table: 'users', column: 'phone' }),
    ]),
    password: schema.string.optional({ trim: true }, [
      rules.confirmed(),
      rules.minLength(6),
      rules.maxLength(255),
    ]),
  })

  public messages: CustomMessages = {
    'name.minLength': 'Name is too short',
    'name.maxLength': 'Name is too long',
    'email.email': 'Email is invalid',
    'email.unique': 'Email is already taken',
    'phone.minLength': 'Phone is too short',
    'phone.maxLength': 'Phone is too long',
    'phone.unique': 'Phone is already taken',
    'password.minLength': 'Password is too short',
    'password.maxLength': 'Password is too long',
    'password.confirmed': 'Password does not match',
  }
}
