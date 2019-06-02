const { Warehouse, Product } = require('../models');

const { productTypes } = require('../graphql/subscriptionsTypes');

module.exports = {
  product: async (root, { id }) => {
    try {
      const product = await Product.findById(id)
        .populate('warehouse')
        .populate('clients.person')
        .populate('clients.quantitys.invoice')
        .populate('suppliders.person')
        .populate('clients.prices.invoice');

      return product;
    } catch (error) {
      console.log(error);
    }
  },

  products: async (root, { limit, offset }) => {
    try {
      const products = await Product.find({})
        .populate('warehouse')
        .populate('clients')
        .populate('suppliders')
        .limit(limit)
        .skip(offset);

      return products;
    } catch (error) {
      console.log(error);
    }
  },
  addProduct: async (pubsub, { input }) => {
    try {
      let warehouse = await Warehouse.findById(input.warehouse);
      const product = new Product({
        name: input.name,
        price: input.price,
        iva: input.iva,
        stock: input.stock,
        warehouse
      });

      await product.save();

      warehouse.products.push(product);

      await warehouse.save();

      pubsub.publish(productTypes.ADD, { productAdded: product });

      return 'Registrado con exito';
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async (root, { input }) => {
    try {
      await Product.findOneAndUpdate({ _id: input.id }, input);

      return 'Actualizado con exito';
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (root, { id }) => {
    try {
      await Product.findOneAndDelete({ _id: id });

      return 'Eliminado con exito';
    } catch (error) {
      console.log(error);
    }
  }
};
