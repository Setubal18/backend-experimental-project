import express from 'express'
import UserController from '../controllers/userController'
import projectController from '../controllers/projectController'
import PartenersAndLocationController from '../controllers/partenersAndLocationController'
const routes = express.Router()

//Add your routes here
routes.post('/user', UserController.create)

routes.get('/user/authors', UserController.listAuthors)


routes.post('/project', projectController.store)
routes.put('/project', projectController.update)
routes.get('/project', projectController.list)


routes.post('/partenersandlocations', PartenersAndLocationController.store)
routes.put('/partenersandlocations', PartenersAndLocationController.update)
routes.get('/partenersandlocations', PartenersAndLocationController.list)


export default routes
