const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
	warehouse: {
		type: Schema.Types.ObjectId,
		ref: 'Warehouse',
	},
	suppliders: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Supplider'
		}
	],
	name: {
		type: String,
		required: true,
		lowercase: true
	},
	stock: {
		type: Number,
		required: true
	},
	iva: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

module.exports = model('Product', ProductSchema);
