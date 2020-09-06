import { Request, Response } from "express";
import { User } from '../models/user'
// import { hashSync, genSaltSync, compareSync, } from 'bcrypt'
import { generateToken } from '../utils/tokenGenerator'

class UserController {
	public async create(req: Request, res: Response) {
		const user = new User({
			name: req.body.name,
			email: { email: req.body.email },
			password: { password: req.body.password },
		})
		console.log(user)

		try {
			if (await User.findOne({ email: user.email })) {
				return res.status(400).send({ error: 'Usuário já cadastrado' })
			}
			else {
				// user.password.password = await hashSync(user.password.password, genSaltSync())
				await user.save()
			}
		}
		catch (e) {
			res.status(422).json({ error: e })
		}

		return res.json({
			user: user.getReturnJson(),
			token: generateToken(user.getReturnJson()),
			message: 'Usuário criado com sucesso'
		})

	}

}

export default new UserController()
