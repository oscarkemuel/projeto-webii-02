import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SellerService from 'App/Services/SellerService'
import AddSallerValidator from 'App/Validators/AddSallerValidator'

export default class SellersController {
  public sellersService = new SellerService()

  public async index({ response }: HttpContextContract) {
    const sellers = await this.sellersService.getSellers()

    return response.ok({ sellers })
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    const payload = await request.validate(AddSallerValidator)

    await bouncer.authorize('isAdmin')
    const seller = await this.sellersService.createSeller(payload)

    return response.created({ seller })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const seller = await this.sellersService.getSellerById(id)

    return response.ok({ seller })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const payload = await request.validate(AddSallerValidator)

    await bouncer.authorize('isAdmin')
    const seller = await this.sellersService.updateSeller(id, payload)

    return response.ok({ seller })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')

    await bouncer.authorize('isAdmin')
    await this.sellersService.deleteSeller(id)

    return response.noContent()
  }
}
