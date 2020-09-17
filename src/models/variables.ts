import { Document, Schema, model, Mongoose, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

export interface VariablesInterface extends Document {
	variable?: [
		{
			variableIndepent: string,
			variaveisDepente?: [{
				var: string;
				hipotese: string
			}]

		}
	]
}

export const VariableSchema = new Schema({
	variable: {
		type: Array,
		properties: new Schema({
			type: Object,
			variableIndepent: {
				type: String,
			},
			variaveisDepente: {
				type: Array,
				properties: {
					type: Object,
					var: {
						type: String
					},
					hipotese: {
						type: String,
					}
				}
			}

		}, {
			_id: false,
			timestamps: true,
		})
	}
})

// VariableSchema.plugin(mongoosePaginate)

// VariableSchema.methods.getReturnJson = function () {
// 	const returnJson = this.toJSON()

// 	return returnJson
// }


// interface VariableModel<T extends Document> extends PaginateModel<T> { }
// export const UserModel: VariableModel<VariablesInterface> =
// 	model<VariablesInterface>('Variable', VariableSchema) as VariableModel<VariablesInterface>;
