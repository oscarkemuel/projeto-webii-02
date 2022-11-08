import BadRequestException from 'App/Exceptions/BadRequestException'
import Address from 'App/Models/Address'
import User from 'App/Models/User'

interface AddressInterface {
  street: string
  city: string
  state: string
  number: number
}

interface UpdateAddressInterface {
  street?: string
  city?: string
  state?: string
  number?: number
}

interface UserInterface {
  name: string
  email: string
  phone: string
  password: string
  address: AddressInterface
}

interface UpdateUserInterface {
  name?: string
  email?: string
  phone?: string
  password?: string
  address?: UpdateAddressInterface
}

class UserService {
  public async getAllUsers() {
    const users = await User.query().orderBy('created_at', 'asc')

    return users
  }

  public async createUser(data: UserInterface) {
    const user = await User.create(data)

    const address = await Address.create(data.address)
    await user.related('address').associate(address)

    return user
  }

  public async getUserById(id: number) {
    const user = await User.findBy('id', id)

    await user?.load('address')

    if (!user) throw new BadRequestException('User not found', 404)

    return user
  }

  public async deleteUser(id: number) {
    const user = await User.findBy('id', id)

    if (!user) throw new BadRequestException('User not found', 404)

    await user.delete()
  }

  public async updateUser(id: number, data: UpdateUserInterface) {
    const user = await User.findBy('id', id)

    if (!user) throw new BadRequestException('User not found', 404)

    if (data.address) {
      const address = await Address.findBy('id', user.addressId)
      address?.merge(data.address)
      address?.save()
    }

    user.merge(data)
    await user.save()

    return user
  }

  public async userToAdmin(id: number) {
    const user = await User.findBy('id', id)

    if (!user) throw new BadRequestException('User not found', 404)

    user.isAdmin = true
    await user.save()

    return user
  }
}

export default UserService
