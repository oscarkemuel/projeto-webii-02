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
    'name.required': 'Name is required',
    'name.minLength': 'Name is too short',
    'name.maxLength': 'Name is too long',
    'email.required': 'Email is required',
    'email.email': 'Email is invalid',
    'email.unique': 'Email is already taken',
    'phone.required': 'Phone is required',
    'phone.minLength': 'Phone is too short',
    'phone.maxLength': 'Phone is too long',
    'phone.unique': 'Phone is already taken',
    'password.required': 'Password is required',
    'password.minLength': 'Password is too short',
    'password.maxLength': 'Password is too long',
    'password.confirmed': 'Password does not match',
  }
}
