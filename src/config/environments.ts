require('dotenv').config()
export const db = {
	uri: process.env.DB_URI || ''
}

export const port_serve = process.env.PORT_SERVER || 3333
export const secret = process.env.SECRET || ''
