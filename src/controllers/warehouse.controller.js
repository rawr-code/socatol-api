const { Warehouse } = require('../models');

const { warehouseTypes } = require('../graphql/subscriptionsTypes');

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
  addWarehouse: async (pubsub, { input }) => {
    try {
      let warehouse = await new Warehouse({
        name: input.name,
        description: input.description
      });

      await warehouse.save();

      pubsub.publish(warehouseTypes.ADD, { warehouseAdded: warehouse });

      return 'Registrado con exito';
    } catch (error) {
      console.log(error);
    }
  },
  updateWarehouse: async (root, { input }) => {
    try {
      console.log(input);
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
