import BadRequestException from 'App/Exceptions/BadRequestException'
import Address from 'App/Models/Address'

interface AddressInterface {
  street: string
  number: number
  state: string
  city: string
}

class AddressService {
  public async getAddresses() {
    const addresses = await Address.all()

    return addresses
  }

  public async getAddressById(id: number) {
    const address = await Address.findBy('id', id)

    if (!address) throw new BadRequestException('Address not found', 404)

    return address
  }

  public async createAddress(data: AddressInterface) {
    const address = await Address.create(data)

    return address
  }

  public async updateAddress(id: number, data: AddressInterface) {
    const address = await Address.findBy('id', id)

    if (!address) throw new BadRequestException('Address not found', 404)

    address.merge(data)
    await address.save()

    return address
  }

  public async deleteAddress(id: number) {
    const address = await Address.findBy('id', id)

    if (!address) throw new BadRequestException('Address not found', 404)

    await address.delete()
  }
}

export default AddressService
