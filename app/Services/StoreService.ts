import BadRequestException from 'App/Exceptions/BadRequestException'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import Seller from 'App/Models/Seller'
import Store from 'App/Models/Store'

interface StoreDataPayload {
  name: string
  description: string
  address: string
}

interface NewSaleData {
  productId: number
  sellerId: number
  quantity: number
}

class StoreService {
  public async createStore(data: StoreDataPayload) {
    const store = await Store.create(data)

    return store
  }

  public async updateStore(data: StoreDataPayload, id: number) {
    const store = await Store.findBy('id', id)

    if (!store) throw new BadRequestException('Store not found', 404)

    store.name = data.name
    store.description = data.description
    store.address = data.address

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

  public async getStoreByIdWithSellersAndProducts(id: number) {
    const store = await Store.findBy('id', id)

    if (!store) throw new BadRequestException('Store not found', 404)

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

    return stores
  }

  public async getProductByStoreId(id: number) {
    const store = await Store.findBy('id', id)

    if (!store) throw new BadRequestException('Store not found', 404)

    await store.load('products')

    const products = store.products

    return products
  }

  public async addSeller(storeId: number, userId: number) {
    const store = await Store.findOrFail(storeId)

    const seller = await Seller.firstOrNew({
      userId: userId,
    })

    await store.related('sellers').save(seller)
  }

  public async removeSeller(storeId: number, sellerId: number) {
    const store = await Store.findOrFail(storeId)

    await store.related('sellers').detach([sellerId])
  }

  public async addNewSale(storeId: number, data: NewSaleData) {
    const product = await Product.findOrFail(data.productId)
    const price = product.price * data.quantity

    if (product.quantity < data.quantity) {
      throw new Error('Quantidade de produtos insuficiente')
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
}

export default StoreService
