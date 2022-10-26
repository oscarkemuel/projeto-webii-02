import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/', 'UsersController.showList')
  Route.post('/', 'UsersController.create')
  Route.get('/:id', 'UsersController.details')
  Route.delete('/:id', 'UsersController.delete')
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
