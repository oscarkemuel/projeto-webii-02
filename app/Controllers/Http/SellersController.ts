import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SellerService from 'App/Services/SellerService'
import UserService from 'App/Services/UserService'
import AddSallerValidator from 'App/Validators/AddSallerValidator'

export default class SellersController {
  public sellersService = new SellerService()
  public userService = new UserService()

  public async index({ response }: HttpContextContract) {
    const sellers = await this.sellersService.getSellers()

    return response.ok({ sellers })
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    const payload = await request.validate(AddSallerValidator)
    const user = await this.userService.getUserByEmail(payload.email)

    await bouncer.authorize('isAdmin')
    const seller = await this.sellersService.createSeller({ userId: user.id })

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
    const user = await this.userService.getUserByEmail(payload.email)

    await bouncer.authorize('isAdmin')
    const seller = await this.sellersService.updateSeller(id, { userId: user.id })

    return response.ok({ seller })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')

    await bouncer.authorize('isAdmin')
    await this.sellersService.deleteSeller(id)

    return response.noContent()
  }
}
