const { Movement, BusinessAccount } = require('../../models/Bank');

const MovementController = {
	getAll: async (req, res) => {
		const movements = await Movement.find({}, [
			'date',
			'reference',
			'description',
			'amount',
			'conciliate',
			'invoices'
		]);

		return res.status(200).json(movements);
	},

	get: async (req, res) => {
		const { movementId } = req.params;
		const movement = await Movement.findById(movementId).populate('account', [
			'name',
			'bank',
			'number',
			'type'
		]);

		if (movement === null) {
			return res
				.status(404)
				.json({ success: false, message: 'No encontrado.' });
		} else {
			return res.status(200).json(movement);
		}
	},

	new: async (req, res) => {
		const { accountId, ...data } = req.body;
		const account = BusinessAccount.findById(accoundId);

		if (account === null) {
			return res
				.status(404)
				.json({ success: false, message: 'No encontrado.' });
		} else {
			const newMovement = new Movement({ account, ...data });
			await newMovement.save();
			account.movements.push(newMovement);
			await account.save();

			return res
				.status(201)
				.json({ success: true, message: 'Registrado con exito!' });
		}
	},

	update: async (req, res) => {
		const { movementId } = req.params;
		const data = req.body;
		const movement = await Movement.findByIdAndUpdate(movementId, data);

		if (movement === null) {
			return res
				.status(404)
				.json({ success: false, message: 'No encontrado.' });
		} else {
			return res
				.status(200)
				.json({ success: true, message: 'Actualizado con exito!' });
		}
	},

	delete: async (req, res) => {
		const { movementId } = req.params;
		const movement = await Movement.findByIdAndRemove(movementId);

		if (movement === null) {
			return res
				.status(404)
				.json({ success: false, message: 'No encontrado.' });
		} else {
			return res
				.status(200)
				.json({ success: true, message: 'Eliminado con exito!' });
		}
	}
};

module.exports = MovementController;