import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'

interface UserInterface {
  name: string
  email: string
  phone: string
  password: string
}

class UserService {
  public async getAllUsers() {
    const users = await User.query().orderBy('created_at', 'asc')

    return users
  }

  public async createUser(data: UserInterface) {
    const user = await User.create(data)

    return user
  }

  public async getUserById(id: number) {
    const user = await User.findBy('id', id)

    if (!user) throw new BadRequestException('User not found', 404)

    return user
  }

  public async deleteUser(id: number) {
    const user = await User.findBy('id', id)

    if (!user) throw new BadRequestException('User not found', 404)

    await user.delete()
  }

  public async updateUser(id: number, data: UserInterface) {
    const user = await User.findBy('id', id)

    if (!user) throw new BadRequestException('User not found', 404)

    user.merge(data)
    await user.save()

    return user
  }
}

export default UserService
