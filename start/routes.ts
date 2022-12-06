import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.showList')
    Route.post('/', 'UsersController.create')
    Route.get('/:id', 'UsersController.details').middleware('auth')
    Route.delete('/:id', 'UsersController.delete').middleware('auth')
    Route.patch('/:id', 'UsersController.update').middleware('auth')
    Route.patch('/:id/admin', 'UsersController.makeAdmin')
  }).prefix('users')

  Route.group(() => {
    Route.post('/login', 'SessionsController.store')
    Route.delete('/logout', 'SessionsController.destroy')
    Route.get('/me', 'SessionsController.getUserByToken').middleware('auth')
  }).prefix('auth')

  Route.group(() => {
    Route.get('/', 'StoresController.showList')
    Route.get('/my-stores/:userId', 'StoresController.getMyStores')
    Route.post('/', 'StoresController.create')
    Route.get('/:id', 'StoresController.details')
    Route.delete('/:id', 'StoresController.delete')
    Route.put('/:id', 'StoresController.update')
    Route.patch('/:id/change-owner', 'StoresController.changeOwner')
    Route.post('/:id/add-seller', 'StoresController.addSeller')
    Route.delete('/:id/remove-seller/:sellerId', 'StoresController.removeSeller')
    Route.post('/:id/add-sale', 'StoresController.addSale')
  })
    .prefix('stores')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'ProductsController.index')
    Route.post('/', 'ProductsController.create')
    Route.get('/:id', 'ProductsController.details')
    Route.delete('/:id', 'ProductsController.delete')
    Route.put('/:id', 'ProductsController.update')
  })
    .prefix('products')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'SellersController.index')
    Route.post('/', 'SellersController.store')
    Route.get('/:id', 'SellersController.show')
    Route.delete('/:id', 'SellersController.destroy')
    Route.put('/:id', 'SellersController.update')
  })
    .prefix('sellers')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'SalesController.index')
    Route.post('/', 'SalesController.store')
    Route.get('/:id', 'SalesController.show')
    Route.delete('/:id', 'SalesController.destroy')
    Route.put('/:id', 'SalesController.update')
  })
    .prefix('sales')
    .middleware('auth')

  Route.group(() => {
    Route.get('/', 'AddressesController.index')
    Route.post('/', 'AddressesController.store')
    Route.get('/:id', 'AddressesController.show')
    Route.delete('/:id', 'AddressesController.destroy')
    Route.put('/:id', 'AddressesController.update')
  })
    .prefix('addresses')
    .middleware('auth')
}).prefix('api/')
