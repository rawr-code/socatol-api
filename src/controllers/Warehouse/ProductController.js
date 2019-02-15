const { Product, Warehouse } = require('../../models/Warehouse');

const ProductController = {
	getAll: async (req, res) => {
		const products = await Product.find({}, ['name', 'stock', 'iva', 'price', 'warehouse']);

		return res.status(200).json(products);
	},

	get: async (req, res) => {
		const { productId } = req.params;
		const product = await Product.findById(productId)
			.populate('warehouse', ['name'])
			.populate({
				path: 'suppliders',
				select: ['personalInfo', 'phone'],
				populate: { path: 'personalInfo' }
			});

		if (product === null) {
			return res.status(404).json({ message: 'No encontrado.' });
		} else {
			return res.status(200).json(product);
		}
	},

	new: async (req, res) => {
		const { warehouseId, ...data } = req.body;
		const warehouse = await Warehouse.findById(warehouseId);

		if (warehouse !== null) {
			const newProduct = new Product({ warehouse, ...data });
			await newProduct.save();
			warehouse.products.push(newProduct);
			await warehouse.save();

			return res
				.status(201)
				.json({ success: true, message: 'Registrado con exito!' });
		} else {
			return res
				.status(404)
				.json({ success: false, message: 'Almacen no encontrado.' });
		}
	},

	update: async (req, res) => {
		const { productId } = req.params;
		const data = req.body;
		const product = await Product.findByIdAndUpdate(productId, data);

		if (product === null)
			return res
				.status(404)
				.json({ success: false, message: 'No encontrado.' });
		else
			return res
				.status(200)
				.json({ success: true, message: 'Actualizado con exito!' });
	},

	delete: async (req, res) => {
		const { productId } = req.params;
		const product = await Product.findByIdAndRemove(productId);

		if (product === null)
			return res
				.status(404)
				.json({ success: false, message: 'No encontrado.' });
		else
			return res
				.status(200)
				.json({ success: true, message: 'Eliminado con exito!' });
	}
};

module.exports = ProductController;
