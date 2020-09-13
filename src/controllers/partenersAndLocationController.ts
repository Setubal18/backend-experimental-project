import { Request, Response } from "express"
import { PartenersAndLocationModel } from '../models/partenersAndLocation';

class PartenersAndLocationController {
	public async store(req: Request, res: Response) {
		let parteners = new PartenersAndLocationModel({})
		const errors: any[] = []
		parteners = Object.assign(parteners, req.body)
		if (await PartenersAndLocationModel.findOne(
			{ $or: [{ "institution.name": parteners.institution.name.trim() }, { "institution.slug": parteners.institution.slug }] })) {
			errors.push('Nome da Instituição/Local ou slug já cadastrado ')
		}
		if (await PartenersAndLocationModel.findOne(
			{ phone: parteners.phone })) {
			errors.push('Telefone já cadastrado')
		}
		if (await PartenersAndLocationModel.findOne(
			{ email: parteners.email })) {
			errors.push('Email já cadastrado')
		}
		if (await PartenersAndLocationModel.findOne(
			{ url: parteners.url })) {
			errors.push('URL já cadastrado')
		}


		try {
			if (errors.length > 0) {
				return res.status(400).send({ errors })
			}
			else {
				await parteners.save()
				return res.send(
					{
						partners: parteners.getReturnJson(),
						message: 'Parceiro/Local criado com sucesso'
					}
				)
			}

		}
		catch (error) {
			return res.send({ error: 'Algo de errado ao cadastrado tente novamente' })
		}

	}


	public async update(req: Request, res: Response) {
		const { id } = req.query
		const parteners = req.body
		try {
			if (id) {
				const errors: any[] = []
				async () => {
					if (await PartenersAndLocationModel.findOne(
						{ $or: [{ "institution.name": parteners.institution.name.trim() }, { "institution.slug": parteners.institution.slug }] })) {
						errors.push('Nome da Instituição/Local ou slug já cadastrado ')
					}
					if (await PartenersAndLocationModel.findOne(
						{ phone: parteners.phone })) {
						errors.push('Telefone já cadastrado')
					}
					if (await PartenersAndLocationModel.findOne(
						{ email: parteners.email })) {
						errors.push('Email já cadastrado')
					}
					if (await PartenersAndLocationModel.findOne(
						{ url: parteners.url })) {
						errors.push('URL já cadastrado')
					}

				}
				if (errors.length > 0) {
					return res.status(400).send({ errors })
				}
				else {
					await PartenersAndLocationModel.updateOne({ _id: id }, parteners)
					const update_partener = await PartenersAndLocationModel.findById({ _id: id })
					return res.send(
						{
							partners: update_partener,
							message: 'Parceiro/Local atualizado com sucesso',
						})
				}
			}

		}
		catch (error) {
			return res.send({ error: 'Algo de errado ao Parceiro/Local tente novamente' })
		}
	}

	public async list(req: Request, res: Response) {
		const { limit = 10, page = 1, id } = req.query
		let query = req?.body
		if (id) {
			query = Object.assign(query, { "_id": id })
		}
		try {
			const option: object = { limit, page }
			PartenersAndLocationModel.paginate(query, option)
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

export default new PartenersAndLocationController()
