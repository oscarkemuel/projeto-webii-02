import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SaleService from 'App/Services/SaleService'

export default class SalesController {
  public salesService = new SaleService()

  public async index({ response }: HttpContextContract) {
    const sales = await this.salesService.getSales()

    return response.ok({ sales })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['productId', 'sellerId', 'quantity', 'storeId', 'price'])

    const sale = await this.salesService.createSale(payload)

    return response.created({ sale })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const sale = await this.salesService.getSaleById(id)

    return response.ok({ sale })
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const payload = request.only(['productId', 'sellerId', 'quantity', 'storeId', 'price'])

    const sale = await this.salesService.updateSale(id, payload)

    return response.ok({ sale })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    await this.salesService.deleteSale(id)

    return response.noContent()
  }
}
