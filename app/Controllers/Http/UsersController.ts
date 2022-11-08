import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public userService = new UserService()

  public async showList({ response }: HttpContextContract) {
    const users = await this.userService.getAllUsers()

    return response.ok({ users })
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    const user = await this.userService.createUser(payload)

    return response.created({ user })
  }

  public async details({ params, response }: HttpContextContract) {
    const user = await this.userService.getUserById(params.id)

    return response.ok({ user })
  }

  public async delete({ request, response }: HttpContextContract) {
    const id = request.param('id')

    await this.userService.deleteUser(id)

    return response.noContent()
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const payload = await request.validate(UpdateUserValidator)

    const user = await this.userService.getUserById(id)
    await bouncer.authorize('isUserHimself', user)

    await this.userService.updateUser(id, payload)

    return response.noContent()
  }

  public async makeAdmin({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const user = await this.userService.userToAdmin(id)

    return response.ok({ user })
  }
}
