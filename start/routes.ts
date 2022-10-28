import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/', 'UsersController.showList')
  Route.post('/', 'UsersController.create')
  Route.get('/:id', 'UsersController.details').middleware('auth')
  Route.delete('/:id', 'UsersController.delete').middleware('auth')
  Route.put('/:id', 'UsersController.update').middleware('auth')
})
  .prefix('users')
  .prefix('api/')

Route.group(() => {
  Route.post('/login', 'SessionsController.store')
  Route.delete('/logout', 'SessionsController.destroy')
})
  .prefix('auth')
  .prefix('api/')

Route.group(() => {
  Route.get('/', 'StoresController.showList')
  Route.post('/', 'StoresController.create')
  Route.get('/:id', 'StoresController.details')
  Route.delete('/:id', 'StoresController.delete')
  Route.put('/:id', 'StoresController.update')
})
  .prefix('stores')
  .prefix('api/')
  .middleware('auth')
