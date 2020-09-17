import { Document, Schema, model, Mongoose, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
export interface PartenersAndLocationInterface extends Document {

	institution: {
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
	institution: new Schema({
		name: {
			type: String,
			unique: true,
			trim: true
		},
		slug: {
			type: String,
			unique: true,
			trim: true
		}
	}, { _id: false, timestamps: true }),
	address: new Schema({
		zip_code: { type: String, trim: true },
		alley: { type: String, trim: true },
		address: { type: String, trim: true },
		complement: { type: String, trim: true },
		country: { type: String, trim: true },
		city: { type: String, trim: true },
		state: { type: String, trim: true }
	}, { _id: true, timestamps: true }),
	phone:
	{
		type: String,
		unique: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		trim: true
	},
	url: {
		type: String,
		unique: true,
		trim: true
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
