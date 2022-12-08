import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreService from 'App/Services/StoreService'
import UserService from 'App/Services/UserService'
import AddSaleValidator from 'App/Validators/AddNewSaleValidator'
import AddSallerValidator from 'App/Validators/AddSallerValidator'
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

  public async getMyStores({ request, response, bouncer }: HttpContextContract) {
    const userId = request.param('userId')

    const user = await this.userService.getUserById(userId)
    await bouncer.authorize('isUserHimself', user)

    await user.load('stores')

    return response.ok({ stores: user.stores })
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
    await bouncer.authorize('ownerOrSallerStore', store)

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

  public async getAllProducts({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')

    const store = await this.storeService.getStoreById(id)
    await bouncer.authorize('ownerOrSallerStore', store)
    await store.load('products')

    return response.ok({ products: store.products })
  }

  public async getAllSales({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')

    const store = await this.storeService.getStoreById(id)
    await bouncer.authorize('ownerOrSallerStore', store)
    await store.load('sales')

    await Promise.all(
      store.sales.map(async (sale) => {
        await sale.load('product')
        await sale.load('seller')
        await sale.seller.load('user')
      })
    )

    return response.ok({ sales: store.sales })
  }

  public async getAllSellers({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')

    const store = await this.storeService.getStoreById(id)
    await bouncer.authorize('ownerOrSallerStore', store)
    await store.load('sellers')

    await Promise.all(
      store.sellers.map(async (seller) => {
        await seller.load('user')
      })
    )

    return response.ok({ sellers: store.sellers })
  }

  public async changeOwner({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const data = await request.validate(ChangeOwnerValidator)

    const store = await this.storeService.getStoreById(id)
    await bouncer.authorize('ownerStore', store)

    await this.storeService.changeOwner(id, data.userId)

    return response.noContent()
  }

  public async addSeller({ request, response, bouncer }: HttpContextContract) {
    const storeId = request.param('id')
    const data = await request.validate(AddSallerValidator)

    const store = await this.storeService.getStoreById(storeId)
    await bouncer.authorize('ownerOrSallerStore', store)

    const seller = await this.storeService.addSeller(storeId, data.email)

    return response.created({ seller })
  }

  public async removeSeller({ request, response, bouncer }: HttpContextContract) {
    const storeId = request.param('id')
    const sellerId = request.param('sellerId')

    const store = await this.storeService.getStoreById(storeId)
    await bouncer.authorize('ownerOrSallerStore', store)

    await this.storeService.removeSeller(storeId, sellerId)

    return response.noContent()
  }

  public async addSale({ request, response, bouncer }: HttpContextContract) {
    const storeId = request.param('id')
    const payload = await request.validate(AddSaleValidator)

    const store = await this.storeService.getStoreByIdWithSellers(storeId)
    await bouncer.authorize('ownerOrSallerStore', store)

    const sale = await this.storeService.addSale(storeId, payload)

    return response.created({ sale })
  }
}
