const { Warehouse } = require('../models');

module.exports = {
  warehouse: async (root, { id }) => {
    try {
      const warehouse = await Warehouse.findById(id).populate('products');

      return warehouse;
    } catch (error) {
      console.log(error);
    }
  },
  warehouses: async (root, { limit, offset }) => {
    try {
      const warehouses = await Warehouse.find({})
        .populate('products')
        .limit(limit)
        .skip(offset);

      return warehouses;
    } catch (error) {
      console.log(error);
    }
  },
  addWarehouse: async (root, { input }) => {
    try {
      const warehouse = await new Warehouse({
        name: input.name,
        description: input.description
      });

      await warehouse.save();

      return 'Registrado con exito';
    } catch (error) {
      console.log(error);
    }
  },
  updateWarehouse: async (root, { input }) => {
    try {
      await Warehouse.findOneAndUpdate({ _id: input.id }, input);

      return 'Actualizado con exito';
    } catch (error) {
      console.log(error);
    }
  },
  deleteWarehouse: async (root, { id }) => {
    try {
      await Warehouse.findOneAndDelete({ _id: id });

      return 'Eliminado con exito';
    } catch (error) {
      console.log(error);
    }
  }
};
