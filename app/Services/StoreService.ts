import BadRequestException from 'App/Exceptions/BadRequestException'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import Seller from 'App/Models/Seller'
import Store from 'App/Models/Store'
import UserService from './UserService'

interface StoreDataPayload {
  name: string
  description: string
  address: string
}

interface UpdateStorePayload {
  name?: string
  description?: string
  address?: string
}

interface NewSaleData {
  productId: number
  sellerId: number
  quantity: number
}

class StoreService {
  public userService = new UserService()

  public async createStore(data: StoreDataPayload) {
    const store = await Store.create(data)

    return store
  }

  public async updateStore(data: UpdateStorePayload, id: number) {
    const store = await Store.findBy('id', id)

    if (!store) throw new BadRequestException('Store not found', 404)

    store.merge(data)
    await store.save()

    return store
  }

  public async deleteStore(id: number) {
    const store = await Store.findBy('id', id)

    if (!store) throw new BadRequestException('Store not found', 404)

    await store.delete()
  }

  public async getStoreById(id: number) {
    const store = await Store.findBy('id', id)

    if (!store) throw new BadRequestException('Store not found', 404)

    return store
  }

  public async getStoreByIdWithSellers(id: number) {
    const store = await Store.findBy('id', id)

    if (!store) throw new BadRequestException('Store not found', 404)

    await store.load('sellers')
    await Promise.all(store.sellers.map(async (seller) => await seller.load('user')))

    return store
  }

  public async getStoreByIdWithSellersAndProducts(id: number) {
    const store = await Store.findBy('id', id)

    if (!store) throw new BadRequestException('Store not found', 404)
    await store.load('owner')

    await store.load('sellers')
    await Promise.all(store.sellers.map(async (seller) => await seller.load('user')))

    await store.load('products')

    await store.load('sales')
    await Promise.all(
      store.sales.map(async (sale) => {
        await sale.load('seller')
        await sale.seller.load('user')
        await sale.load('product')
      })
    )

    return store
  }

  public async getAllStores() {
    const stores = await Store.query().orderBy('created_at', 'asc')

    await Promise.all(
      stores.map(async (store) => {
        await store.load('owner')
      })
    )

    return stores
  }

  public async changeOwner(storeId: number, userId: number) {
    const store = await Store.findBy('id', storeId)
    if (!store) throw new BadRequestException('Store not found', 404)

    store.ownerId = userId
    await store.save()

    return store
  }

  public async getProductByStoreId(id: number) {
    const store = await Store.findBy('id', id)

    if (!store) throw new BadRequestException('Store not found', 404)

    await store.load('products')

    const products = store.products

    return products
  }

  public async addSeller(storeId: number, email: string) {
    const store = await Store.findOrFail(storeId)
    const user = await this.userService.getUserByEmail(email)

    const seller = await Seller.firstOrNew({
      userId: user.id,
    })

    await store.related('sellers').save(seller)
    await seller.load('user')

    return seller
  }

  public async removeSeller(storeId: number, sellerId: number) {
    const store = await Store.findOrFail(storeId)

    const seller = await Seller.findBy('id', sellerId)
    if (!seller) throw new BadRequestException('Seller not found', 404)

    await store.related('sellers').detach([seller.id])
  }

  public async addSale(storeId: number, data: NewSaleData) {
    const product = await Product.findOrFail(data.productId)
    const store = await Store.findOrFail(storeId)
    const price = product.price * data.quantity

    await store.load('sellers')
    const seller = store.sellers.find((seller) => seller.id === data.sellerId)
    if (!seller) throw new BadRequestException('Seller not found in this store', 404)

    if (product.quantity < data.quantity) {
      throw new BadRequestException('Quantidade de produtos insuficiente', 400)
    }

    const sale = await Sale.create({
      productId: data.productId,
      sellerId: data.sellerId,
      storeId: storeId,
      quantity: data.quantity,
      price,
    })

    product.quantity -= data.quantity
    await product.save()

    return sale
  }

  public async getStoresByUserSeller(userId: number) {
    const user = await this.userService.getUserById(userId)

    const stores = await Store.query()
      .whereHas('sellers', (query) => {
        query.where('user_id', user.id)
      })
      .orderBy('created_at', 'asc')

    return stores
  }
}

export default StoreService
