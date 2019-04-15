// Models
const Warehouse = require('./models/Warehouse');

const resolvers = {
  Query: {
    // Warehouse Queries
    getWarehouse: (root, { id }) => {
      return new Promise((resolve, object) => {
        Warehouse.findById(id, (error, warehouse) => {
          if (error) rejects(error);
          else resolve(warehouse);
        });
      });
    },
    getWarehouses: (root, { limit, offset }) => {
      return (warehouses = Warehouse.find({})
        .limit(limit)
        .skip(offset));
    }
  },
  Mutation: {
    // Warehouse Mutations
    newWarehouse: (root, { input }) => {
      const { name, description, active } = input;

      const warehouse = new Warehouse({
        name,
        description,
        active
      });

      return new Promise((resolve, object) => {
        warehouse.save(error => {
          if (error) rejects(error);
          else resolve(warehouse);
        });
      });
    },
    updateWarehouse: (root, { input }) => {
      return new Promise((resolve, warehouse) => {
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
      return new Promise((resolve, warehouse) => {
        Warehouse.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error);
          else resolve('Se elimino correctamente');
        });
      });
    }
  }
};

module.exports = resolvers;
