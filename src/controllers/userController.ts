import { Request, Response } from "express";
import { UserModel } from '../models/user'
// import { hashSync, genSaltSync, compareSync, } from 'bcrypt'
import { generateToken } from '../utils/tokenGenerator'

class UserController {
	public async create(req: Request, res: Response) {
		const user = new UserModel({
			name: req.body.name,
			email: { email: req.body.email },
			password: { password: req.body.password },
		})
		try {
			if (await UserModel.findOne({ email: user.email })) {
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

	public async listAuthors(req: Request, res: Response) {
		const { limit = 10, page = 1, } = req.query
		let query = req?.body
		// if (id) {
		// 	query = Object.assign(query, { "_id": id })
		// }
		try {
			query = Object.assign(query, { isAuthor: true })
			const option: object = { limit, page }
			UserModel.paginate(query, option)
				.then((result: any) => {
					return res.json({ message: "Sucesso", result })
				})
				.catch((err: any) => {
					return res.json(err)
				})
		} catch (e) {
			res.status(422).json({ error: e.error })
		}
	}
}

export default new UserController()
