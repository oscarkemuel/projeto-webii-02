import BadRequestException from 'App/Exceptions/BadRequestException'
import Sale from 'App/Models/Sale'

interface SaleInterface {
  productId: number
  quantity: number
  sellerId: number
  storeId: number
  price: number
}

class SaleService {
  public async getSales() {
    const sales = await Sale.all()

    return sales
  }

  public async getSaleById(id: number) {
    const sale = await Sale.findBy('id', id)

    if (!sale) throw new BadRequestException('Sale not found', 404)

    return sale
  }

  public async createSale(data: SaleInterface) {
    const sale = await Sale.create(data)

    return sale
  }

  public async updateSale(id: number, data: SaleInterface) {
    const sale = await Sale.findBy('id', id)

    if (!sale) throw new BadRequestException('Sale not found', 404)

    sale.merge(data)
    await sale.save()

    return sale
  }

  public async deleteSale(id: number) {
    const sale = await Sale.findBy('id', id)

    if (!sale) throw new BadRequestException('Sale not found', 404)

    await sale.delete()
  }
}

export default SaleService
