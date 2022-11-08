import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddressService from 'App/Services/AddressService'

export default class AddressesController {
  public addressService = new AddressService()

  public async index({ response }: HttpContextContract) {
    const addresses = await this.addressService.getAddresses()

    return response.ok({ addresses })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only([
      'street',
      'number',
      'complement',
      'neighborhood',
      'city',
      'state',
    ])

    const address = await this.addressService.createAddress(payload)

    return response.created({ address })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const address = await this.addressService.getAddressById(id)

    return response.ok({ address })
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const payload = request.only([
      'street',
      'number',
      'complement',
      'neighborhood',
      'city',
      'state',
    ])

    const address = await this.addressService.updateAddress(id, payload)

    return response.ok({ address })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    await this.addressService.deleteAddress(id)

    return response.noContent()
  }
}
