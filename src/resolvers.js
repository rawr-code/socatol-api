// Models
const Warehouse = require('./models/Warehouse');
const Product = require('./models/Product');

const resolvers = {
  Query: {
    // Warehouse
    getWarehouse: (root, { id }) => {
      return new Promise((resolve, object) => {
        Warehouse.findById(id, (error, warehouse) => {
          if (error) rejects(error);
          else resolve(warehouse);
        });
      });
    },
    getWarehouses: (root, { limit, offset }) => {
      return Warehouse.find({})
        .limit(limit)
        .skip(offset);
    },

    // Product
    getProduct: (root, { id }) => {
      return new Promise((resolve, object) => {
        Product.findById(id, (error, product) => {
          if (error) rejects(error);
          else resolve(product);
        });
      });
    },
    getProducts: (root, { limit, offset }) => {
      return Product.find({})
        .limit(limit)
        .skip(offset);
    }
  },
  Mutation: {
    // Warehouse
    newWarehouse: (root, { input }) => {
      const warehouse = new Warehouse({
        name: input.name,
        description: input.description,
        active: input.active
      });

      return new Promise((resolve, object) => {
        warehouse.save(error => {
          if (error) rejects(error);
          else resolve(warehouse);
        });
      });
    },
    updateWarehouse: (root, { input }) => {
      return new Promise((resolve, object) => {
        Warehouse.findOneAndUpdate(
          { _id: input.id },
          input,
          (error, warehouse) => {
            if (error) rejects(error);
            else resolve(warehouse);
          }
        );
      });
    },
    deleteWarehouse: (root, { id }) => {
      return new Promise((resolve, object) => {
        Warehouse.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error);
          else resolve('Se elimino correctamente');
        });
      });
    },

    // Product
    newProduct: (root, { input }) => {
      const product = new Product({
        name: input.name,
        price: input.price,
        stock: input.stock,
        iva: input.iva,
        description: input.description,
        active: input.active,
        warehouse: input.warehouse
      });

      return new Promise((resolve, object) => {
        product.save(error => {
          if (error) rejects(error);
          else resolve(product);
        });
      });
    },
    updateProduct: (root, { input }) => {
      return new Promise((resolve, object) => {
        Product.findOneAndUpdate({ _id: input.id }, input, (error, product) => {
          if (error) rejects(error);
          else resolve(product);
        });
      });
    },
    deleteProduct: (root, { id }) => {
      return new Promise((resolve, object) => {
        Product.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error);
          else resolve('Se elimino correctamente');
        });
      });
    }
  }
};

module.exports = resolvers;
