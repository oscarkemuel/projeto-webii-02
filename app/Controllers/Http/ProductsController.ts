import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductService from 'App/Services/ProductService'
import StoreService from 'App/Services/StoreService'
import CreateProductValidator from 'App/Validators/CreateProductValidator'

export default class ProductsController {
  public productService = new ProductService()
  public storeService = new StoreService()

  public async index({ response }: HttpContextContract) {
    const products = await this.productService.getAll()

    return response.ok({ products })
  }

  public async create({ request, response, bouncer }: HttpContextContract) {
    const payload = await request.validate(CreateProductValidator)

    const store = await this.storeService.getStoreByIdWithSellers(payload.storeId)
    await bouncer.authorize('ownerOrSallerStore', store)

    const product = await this.productService.createProduct(payload)
    return response.created({ product })
  }

  public async details({ params, response }: HttpContextContract) {
    const product = await this.productService.getProductById(params.id)

    return response.ok({ product })
  }

  public async delete({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')

    const product = await this.productService.getProductById(id)
    const store = await this.storeService.getStoreByIdWithSellers(product.storeId)
    await bouncer.authorize('ownerOrSallerStore', store)

    await this.productService.deleteProduct(product.id)
    return response.noContent()
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const data = await request.validate(CreateProductValidator)

    const store = await this.storeService.getStoreByIdWithSellers(data.storeId)
    await bouncer.authorize('ownerOrSallerStore', store)

    await this.productService.updateProduct(id, data)
    return response.noContent()
  }
}
