import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreService from 'App/Services/StoreService'
import UserService from 'App/Services/UserService'
import ChangeOwnerValidator from 'App/Validators/ChangeOwnerValidator'
import CreateStoreValidator from 'App/Validators/CreateStoreValidator'
import UpdateStoreValidator from 'App/Validators/UpdateStoreValidator'

export default class StoresController {
  public storeService = new StoreService()
  public userService = new UserService()

  public async showList({ response }: HttpContextContract) {
    const stores = await this.storeService.getAllStores()

    return response.ok({ stores })
  }

  public async details({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const store = await this.storeService.getStoreByIdWithSellersAndProducts(id)

    return response.ok({ store })
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateStoreValidator)

    const store = await this.storeService.createStore(payload)

    return response.created({ store })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const paylaod = await request.validate(UpdateStoreValidator)
    const id = request.param('id')

    const store = await this.storeService.getStoreById(id)
    await bouncer.authorize('ownerStore', store)

    await this.storeService.updateStore(paylaod, id)

    return response.noContent()
  }

  public async delete({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')

    const store = await this.storeService.getStoreById(id)
    await bouncer.authorize('ownerStore', store)

    await this.storeService.deleteStore(id)

    return response.noContent()
  }

  public async changeOwner({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const data = await request.validate(ChangeOwnerValidator)

    const store = await this.storeService.getStoreById(id)
    await bouncer.authorize('ownerStore', store)

    await this.storeService.changeOwner(id, data.userId)

    return response.noContent()
  }

  public async addSeller({ request, response }: HttpContextContract) {
    const storeId = request.param('id')
    const data = request.only(['userId'])

    const seller = await this.storeService.addSeller(storeId, data.userId)

    return response.created({ seller })
  }

  public async removeSeller({ request, response }: HttpContextContract) {
    const storeId = request.param('id')
    const sellerId = request.param('sellerId')

    await this.storeService.removeSeller(storeId, sellerId)

    return response.noContent()
  }

  public async addNewSale({ request, response }: HttpContextContract) {
    const storeId = request.param('id')
    const data = request.only(['productId', 'sellerId', 'quantity'])

    const sale = await this.storeService.addNewSale(storeId, data)

    return response.created({ sale })
  }
}
