import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    street: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    city: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    state: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(2)]),
    number: schema.number([rules.range(1, 9999)]),
  })

  public messages: CustomMessages = {
    'street.required': 'Street is required',
    'street.minLength': 'Street is too short',
    'street.maxLength': 'Street is too long',
    'city.required': 'City is required',
    'city.minLength': 'City is too short',
    'city.maxLength': 'City is too long',
    'state.required': 'State is required',
    'state.minLength': 'State is too short',
    'state.maxLength': 'State is too long',
    'number.required': 'Number is required',
    'number.range': 'Number is invalid',
  }
}
