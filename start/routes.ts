import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/', 'UsersController.showList')
  Route.post('/', 'UsersController.create')
  Route.get('/:id', 'UsersController.details')
  Route.delete('/:id', 'UsersController.delete')
  Route.put('/:id', 'UsersController.update')
})
  .prefix('users')
  .prefix('api/')
