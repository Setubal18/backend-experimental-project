import { Request, Response } from "express";
import { ProjectModel } from '../models/project';


class ProjectController {
	public async store(req: Request, res: Response) {
		let project = new ProjectModel({})

		project = Object.assign(project, req.body)
		console.log(project)
		try {
			if (await ProjectModel.findOne({ title: project.title })) {
				return res.status(400).send({ error: 'Projeto já cadastrado' })
			}
			await project.save()
			return res.send(
				{
					project: project.getReturnJson(),
					message: 'Projeto criado com sucesso'
				}
			)
		}
		catch (error) {
			console.log(error)
			return res.send({ error: 'Algo de errado ao cadastrado tente novamente' })
		}

	}


	public async update(req: Request, res: Response) {
		const { id } = req.query
		const project = req.body
		try {
			if (id) {
				console.log(project)
				await ProjectModel.updateOne({ _id: id }, project)
				let update_project = await ProjectModel.findById({ _id: id })
				return res.send(
					{
						project: update_project,
						message: 'Projeto atualizado com sucesso',
					})
			}
		}
		catch (error) {
			console.log(error)
			return res.send({ error: 'Algo de errado ao Editar projeto tente novamente' })
		}
	}

	public async list(req: Request, res: Response) {
		const { limit = 10, page = 1, id } = req.query
		let query = req?.body
		if (id) {
			query = Object.assign(query, { "_id": id })
		}
		console.log('aqui')
		try {
			const option: object = { limit, page }
			ProjectModel.paginate(query, option)
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

export default new ProjectController()
