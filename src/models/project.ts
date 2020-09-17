import { Document, Schema, model, Mongoose, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { ObjectID } from "mongodb"
import { VariableSchema, VariablesInterface } from './variables';
export interface ProjectInterface extends Document {
	title: string,
	thema: string,
	technicalArea?: string,
	context?: string,
	author?: [{ name: string, }],
	affliation?: [{ locals_id: ObjectID, }],
	locals?: [{ locals_id: ObjectID, }]
	data?: Date
	introduction?: string,
	characterization?: {
		type?: string,
		domain?: string,
		Language?: {
			explanation?: string,
			material?: string
		}
		partners?: [{ locals_id: ObjectID, }]
		links: [{ link?: string }]
		estimatedAccomplishing?: string
		estimatedReplicationnumber?: number,
		glossary?: [{
			slug?: string,
			description?: string
		}],
		variables?: VariablesInterface
		experimentalStudyDef?: {
			objectStudy?: string,
			globalobjective?: string,
			specificAims?: string,
			qualityFocus?: string,
			context?: string,
			questions?: string,
			metrics?: string
		},
	},


	getReturnJson(): any
}

const ProjectSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	thema: {
		type: String,
		required: true,
		trim: true
	},
	technicalArea: {
		type: String,
		trim: true
	},
	author: {
		type: Array,
		properties: {
			name: {
				type: String
			},
			_id: ObjectID,
			required: false,
		}
	},
	affliation: {
		type: Array,
		properties: {
			local_id: {
				type: ObjectID,
				ref: 'partenersandlocations'
			},
		}
	},
	locals: {
		type: Array,
		properties: {
			type: Object,
			locals_id: {
				type: ObjectID,
				ref: 'partenersandlocations',
			}
		}
	},
	data: {
		type: Date,
		default: Date.now
	},
	introduction: {
		type: String,
		maxlength: 450
	},
	variables: VariableSchema,
	characterization: new Schema({
		type: {
			type: String,
			trim: true
		},
		domain: {
			type: String,
			trim: true
		},
		Language: {
			explanation: {
				type: String,
				trim: true
			},
			material: {
				type: String,
				trim: true
			},
		},
		links: {
			type: Array,
			properties: {
				link: { Type: String, trim: true }
			}
		},
		estimatedAccomplishing: {
			type: String,
			trim: true
		},
		estimatedReplicationnumber: {
			type: Number
		},
		glossary: {
			type: Array,
			properties: {
				slug: { type: String, trim: true },
				description: { type: String, trim: true },
			}

		},
		partners: {
			type: Array,
			properties: {
				type: Object,
				locals_id: {
					type: ObjectID,
					ref: 'partenersandlocations',
				}
			}
		}
	}, { _id: true, timestamps: true }),
	experimentalStudyDef: new Schema({
		objectStudy: {
			type: String,
			trim: true
		},
		globalobjective: {
			type: String,
			trim: true
		},
		specificAims: {
			type: String,
			trim: true
		},
		qualityFocus: {
			type: String,
			trim: true
		},
		context: {
			type: String,
			trim: true
		},
		questions: {
			type: String,
			trim: true
		},
		metrics: {
			type: String,
			trim: true
		},
	},
		{ _id: true, timestamps: true }),

}, { timestamps: true })

ProjectSchema.plugin(mongoosePaginate)

ProjectSchema.methods.getReturnJson = function () {
	const returnJson = this.toJSON()

	return returnJson
}

interface ProjectModel<T extends Document> extends PaginateModel<T> { }
export const ProjectModel: ProjectModel<ProjectInterface> =
	model<ProjectInterface>('project', ProjectSchema) as ProjectModel<ProjectInterface>;
