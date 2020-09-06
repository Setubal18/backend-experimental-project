import express from 'express'
import UserController from '../controllers/userController'

const routes = express.Router()

//Add your routes here
routes.post('/user', UserController.create)





export default routes
