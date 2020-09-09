import mongoose from 'mongoose'
import { db } from '../config/environments'


function connectionBD() {
	mongoose.connect(db.uri,
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
			console.log('Banco Conectado')
		}).catch((error) => {
			console.log(error, 'error Banco')
		})

}

export default connectionBD
