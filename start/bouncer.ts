import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Store from 'App/Models/Store'
import User from 'App/Models/User'

export const { actions } = Bouncer.define('ownerStore', (user: User, store: Store) => {
  if (user.id === store.ownerId || user.isAdmin) {
    return true
  }

  return Bouncer.deny('You are not the owner of this store')
})
  .define('ownerOrSallerStore', async (user: User, store: Store) => {
    await store.load('sellers')

    if (
      user.id === store.ownerId ||
      store.sellers.filter((seller) => seller.userId === user.id).length > 0 ||
      user.isAdmin
    ) {
      return true
    }

    return Bouncer.deny('You are not the owner or saller of this store')
  })
  .define('isAdmin', (user: User) => {
    if (user.isAdmin) {
      return true
    }

    return Bouncer.deny('You are not admin')
  })
  .define('isUserHimself', (user: User, userToCompare: User) => {
    if (user.id === userToCompare.id || user.isAdmin) {
      return true
    }

    return Bouncer.deny('You are not the user')
  })

export const { policies } = Bouncer.registerPolicies({})
