import express from "express"
import routes from "../routes/routes"

// In case you need to import the connection with your database
// import connectionBD from '../database/connection'
import cors from 'cors'
import { port_serve } from './environments'
export default new class ExpressServer {
	private app: any

	public constructor() {
		this.app = express()
		this.app.use(cors())
		this.app.use(express.json())
		this.routes()
	}

	public initServer() {
		//connectionBD()
		this.app.use('/api', routes)
		this.app.listen(port_serve, () => {
			console.log(`Example app listening on port ${port_serve}!`);
		})
	}


	public routes() {
		this.app.use(routes)
	}
}
