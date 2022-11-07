import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductService from 'App/Services/ProductService'
import StoreService from 'App/Services/StoreService'
import CreateProductValidator from 'App/Validators/CreateProductValidator'

export default class ProductsController {
  public productService = new ProductService()
  public storeService = new StoreService()

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateProductValidator)

    const product = await this.productService.createProduct(payload)
    return response.created({ product })
  }

  public async details({ params, response }: HttpContextContract) {
    const product = await this.productService.getProductById(params.id)

    return response.ok({ product })
  }

  public async delete({ request, response }: HttpContextContract) {
    const id = request.param('id')

    await this.productService.deleteProduct(id)
    return response.noContent()
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const data = await request.validate(CreateProductValidator)

    await this.productService.updateProduct(id, data)
    return response.noContent()
  }
}
