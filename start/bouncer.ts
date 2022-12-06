import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Store from 'App/Models/Store'
import User from 'App/Models/User'

export const { actions } = Bouncer.define('ownerStore', (user: User, store: Store) => {
  if (user.id === store.ownerId || user.isAdmin) {
    return true
  }

  return Bouncer.deny('You are not the owner of this store')
})
  .define('ownerOrSallerStore', (user: User, store: Store) => {
    if (
      user.id === store.ownerId ||
      store.sellers.filter((seller) => seller.id === user.id).length > 0 ||
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
    console.log(user.name)
    console.log(userToCompare.name)
    if (user.id === userToCompare.id || user.isAdmin) {
      return true
    }

    return Bouncer.deny('You are not the user')
  })

export const { policies } = Bouncer.registerPolicies({})
