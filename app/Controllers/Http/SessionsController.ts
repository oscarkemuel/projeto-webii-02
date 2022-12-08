import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreService from 'App/Services/StoreService'

export default class SessionsController {
  public storeService = new StoreService()

  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const token = await auth.use('api').attempt(email, password, { expiresIn: '2hours' })

    await auth.user?.load('address')
    await auth.user?.load('stores')

    const stores = await this.storeService.getStoresByUserSeller(auth.user?.id || 0)

    auth.user?.stores.push(...stores)
    return response.created({ user: auth.user, token })
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.ok({})
  }

  public async getUserByToken({ auth, response }: HttpContextContract) {
    await auth.user?.load('address')
    await auth.user?.load('stores')

    const stores = await this.storeService.getStoresByUserSeller(auth.user?.id || 0)

    auth.user?.stores.push(...stores)

    return response.ok({ user: auth.user })
  }
}
