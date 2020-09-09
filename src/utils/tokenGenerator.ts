import { sign } from 'jsonwebtoken'
import { secret } from '../config/environments'


export function generateToken(params = {}) {
	return sign(params, secret, { expiresIn: 10800 })
}
