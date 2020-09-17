import { Document, Schema, model, Mongoose, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

export interface UserInterface extends Document {
	name: string,
	email: {
		email: string,
		createdAt?: Date,
		updatedAt?: Date
	},
	password?: {
		password: string,
		createdAt?: Date,
		updatedAt?: Date

	},
	isAuthor: boolean
	createdAt?: Date,
	updatedAt?: Date

	getReturnJson(): any
}

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	isAuthor: {
		type: Boolean,
		default: true
	},
	email: new Schema({
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
			trim: true
		},
	},
		{
			_id: false,
			timestamps: true,
		}),
	password: new Schema({
		password: {
			type: String,
			required: false
		},
	},
		{
			_id: false,
			timestamps: true,
		}),
})

UserSchema.plugin(mongoosePaginate)

UserSchema.methods.getReturnJson = function () {
	const returnJson = this.toJSON()
	delete returnJson.password.password;


	return returnJson
}


interface UserModel<T extends Document> extends PaginateModel<T> { }
export const UserModel: UserModel<UserInterface> =
	model<UserInterface>('user', UserSchema) as UserModel<UserInterface>;
