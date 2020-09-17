import { Document, Schema, model, Mongoose, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { ObjectID } from "mongodb"
export interface ProjectInterface extends Document {
	title: string,
	thema: string,
	technicalArea?: string,
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
		unique: true
	},
	thema: {
		type: String,
		required: true,
	},
	technicalArea: {
		type: String
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
	characterization: new Schema({
		type: {
			type: String
		},
		domain: {
			type: String
		},
		Language: {
			explanation: {
				type: String
			},
			material: {
				type: String
			},
		},
		links: {
			type: Array,
			properties: {
				link: { Type: String }
			}
		},
		estimatedAccomplishing: {
			type: String
		},
		estimatedReplicationnumber: {
			type: Number
		},
		glossary: {
			type: Array,
			properties: {
				slug: { type: String },
				description: { type: String },
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
			type: String
		},
		globalobjective: {
			type: String
		},
		specificAims: {
			type: String
		},
		qualityFocus: {
			type: String
		},
		context: {
			type: String
		},
		questions: {
			type: String
		},
		metrics: {
			type: String
		},
	}, { _id: true, timestamps: true }),

}, { timestamps: true })

ProjectSchema.plugin(mongoosePaginate)

ProjectSchema.methods.getReturnJson = function () {
	const returnJson = this.toJSON()

	return returnJson
}

interface ProjectModel<T extends Document> extends PaginateModel<T> { }
export const ProjectModel: ProjectModel<ProjectInterface> =
	model<ProjectInterface>('project', ProjectSchema) as ProjectModel<ProjectInterface>;
