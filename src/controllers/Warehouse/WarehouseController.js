const { Warehouse } = require("../../models/Warehouse");

const WarehouseController = {
  getAll: async (req, res) => {
    const warehouses = await Warehouse.find({});

    res.status(200).json(warehouses);
  },

  get: async (req, res) => {
    const { warehouseId } = req.params;
    console.log(warehouseId);
    const warehouse = await Warehouse.findById(warehouseId);

    res.status(200).json(warehouse);
  },

  new: async (req, res) => {
    const { name, code } = req.body;
    const newWarehouse = new Warehouse({ name, code });
    const warehouse = await newWarehouse.save();

    res.status(200).json(warehouse);
  },

  update: async (req, res) => {
    const { warehouseId } = req.params;
    const data = req.body;
    await Warehouse.findByIdAndUpdate(warehouseId, data);

    res.status(200).json({ success: true, message: "Actualizado con exito!" });
  },

  delete: async (req, res) => {
    const { warehouseId } = req.params;
    await Warehouse.findByIdAndRemove(warehouseId);

    res.status(200).json({ success: true, message: "Eliminado con exito!" });
  }
};

module.exports = WarehouseController;
