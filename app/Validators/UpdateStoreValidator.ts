import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    description: schema.string.optional({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    address: schema.string.optional({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
  })

  public messages: CustomMessages = {
    'name.minLength': 'Name is too short',
    'name.maxLength': 'Name is too long',
    'description.minLength': 'Description is too short',
    'description.maxLength': 'Description is too long',
    'address.minLength': 'Address is too short',
    'address.maxLength': 'Address is too long',
  }
}
