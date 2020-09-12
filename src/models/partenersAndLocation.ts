import { Document, Schema, model, Mongoose, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
export interface PartenersAndLocationInterface extends Document {

	institutions: {
		name: string
		slug?: string
	},
	address?: {
		zip_code: string,
		alley: string,
		address: string,
		complement?: string,
		country: string,
		city: string,
		state: string
	},
	phone?: string,
	email?: string,
	url?: string


	getReturnJson(): any

	getReturnJsonMim(): any
}

const partenersAndLocationSchema = new Schema({
	institutions: {
		properties: {
			name: {
				type: String,
				unique: true
			},
			slug: {
				type: String,
				unique: true
			}
		}
	},
	address: {
		properties: {
			zip_code: { type: String },
			alley: { type: String },
			address: { type: String },
			complement: { type: String },
			country: { type: String },
			city: { type: String },
			state: { type: String }
		}
	},
	phone:
	{
		type: String,
		unique: true
	},
	email: {
		type: String,
		unique: true
	},
	url: {
		type: String,
		unique: true
	},

})

partenersAndLocationSchema.plugin(mongoosePaginate)

partenersAndLocationSchema.methods.getReturnJson = function () {
	const returnJson = this.toJSON()
	return returnJson
}

partenersAndLocationSchema.methods.getReturnJsonMim = function () {
	const returnJson = this.toJson()
	return returnJson
}

interface PartenersAndLocationModel<T extends Document> extends PaginateModel<T> { }
export const PartenersAndLocationModel: PartenersAndLocationModel<PartenersAndLocationInterface> =
	model<PartenersAndLocationInterface>('PartenersAndLocations', partenersAndLocationSchema) as
	PartenersAndLocationModel<PartenersAndLocationInterface>;
