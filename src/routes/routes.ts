import express from 'express'
import UserController from '../controllers/userController'
import projectController from '../controllers/projectController'

const routes = express.Router()

//Add your routes here
routes.post('/user', UserController.create)


routes.post('/project', projectController.store)
routes.put('/project', projectController.update)
routes.get('/project', projectController.list)


export default routes
