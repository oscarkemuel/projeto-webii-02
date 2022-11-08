import BadRequestException from 'App/Exceptions/BadRequestException'
import Seller from 'App/Models/Seller'

interface SellerInterface {
  userId: number
}

class SellerService {
  public async getSellers() {
    const sellers = await Seller.all()

    return sellers
  }

  public async getSellerById(id: number) {
    const seller = await Seller.findBy('id', id)

    if (!seller) throw new BadRequestException('Seller not found', 404)

    return seller
  }

  public async createSeller(data: SellerInterface) {
    const seller = await Seller.create(data)

    return seller
  }

  public async updateSeller(id: number, data: SellerInterface) {
    const seller = await Seller.findBy('id', id)

    if (!seller) throw new BadRequestException('Seller not found', 404)

    seller.merge(data)
    await seller.save()

    return seller
  }

  public async deleteSeller(id: number) {
    const seller = await Seller.findBy('id', id)

    if (!seller) throw new BadRequestException('Seller not found', 404)

    await seller.delete()
  }
}

export default SellerService
