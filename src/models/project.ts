import { Document, Schema, model, Mongoose, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { ObjectID } from "mongodb"
export interface ProjectInterface extends Document {
	title: string,
	thema: string,
	technicalArea?: string,
	author?: [{ name: string, _id?: ObjectID }],
	affliation?: [{ name: string, _id?: ObjectID }],
	local: { name: string, _id?: ObjectID }
	data: Date
	introduction?: ObjectID,
	characterization?: ObjectID,
	experimentalStudyDef?: ObjectID,

	getReturnJson(): any
}

const ProjectSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	thema: {
		type: String,
		required: true,
	},
	technicalArea: {
		type: String
	},
	author: new Schema({
		type: Array,
		properties: {
			name: {
				type: String
			},
			_id: ObjectID,
			required: false
		}
	}),
	affliation: new Schema({
		type: Array,
		properties: {
			name: {
				type: String
			},
			_id: ObjectID,
			required: false
		}
	}),
	local: new Schema({
		type: Array,
		properties: {
			name: {
				type: String
			},
			_id: ObjectID,
			required: false
		}
	}),
	data: {
		type: Date,
	},
	introduction: {
		type: ObjectID
	},
	characterization: {
		type: ObjectID
	},
	experimentalStudyDef: {
		type: ObjectID
	},
})

ProjectSchema.plugin(mongoosePaginate)

ProjectSchema.methods.getReturnJson = function () {
	const returnJson = this.toJSON()
	delete returnJson.password.password;


	return returnJson
}

interface ProjectModel<T extends Document> extends PaginateModel<T> { }
export const ProjectModel: ProjectModel<ProjectInterface> =
	model<ProjectInterface>('project', ProjectSchema) as ProjectModel<ProjectInterface>;
