import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Store from 'App/Models/Store'
import User from 'App/Models/User'

export const { actions } = Bouncer.define('ownerStore', (user: User, store: Store) => {
  if (user.id === store.ownerId) {
    return true
  }

  return Bouncer.deny('You are not the owner of this store')
}).define('ownerOrSallerStore', (user: User, store: Store) => {
  if (user.id === store.ownerId || store.sellers.find((seller) => seller.id === user.id)) {
    return true
  }

  return Bouncer.deny('You are not the owner or saller of this store')
})

export const { policies } = Bouncer.registerPolicies({})
