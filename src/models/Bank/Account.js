const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
	name: {
		type: String,
		required: true,
		lowercase: true
	},
	bank: {
		type: String,
		required: true,
		lowercase: true
	},
	number: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true,
		lowercase: true,
		enum: ['corriente', 'ahorro']
	},
	movements: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Movement'
		}
	]
});

module.exports = model('Account', AccountSchema);
