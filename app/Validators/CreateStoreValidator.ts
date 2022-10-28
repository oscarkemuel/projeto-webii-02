import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    description: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    address: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    ownerId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required',
    'name.minLength': 'Name is too short',
    'name.maxLength': 'Name is too long',
    'description.required': 'Description is required',
    'description.minLength': 'Description is too short',
    'description.maxLength': 'Description is too long',
    'address.required': 'Address is required',
    'address.minLength': 'Address is too short',
    'address.maxLength': 'Address is too long',
    'ownerId.required': 'Owner is required',
    'ownerId.exists': 'User does not exist',
  }
}
