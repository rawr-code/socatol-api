const { Warehouse } = require("../../models/Warehouse");

const WarehouseController = {
  getAll: async (req, res) => {
    const warehouses = await Warehouse.find({});

    return res.status(200).json(warehouses);
  },

  get: async (req, res) => {
    const { id } = req.params;
    const warehouse = await Warehouse.findById(id);

    return res.status(200).json(warehouse);
  },

  new: async (req, res) => {
    const data = req.body;
    const newWarehouse = new Warehouse(data);
    await newWarehouse.save();

    return res
      .status(201)
      .json({ success: true, message: "Registrado con exito!" });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const warehouse = await Warehouse.findByIdAndUpdate(id, data);

    if (warehouse === null)
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    else
      return res
        .status(200)
        .json({ success: true, message: "Actualizado con exito!" });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const warehouse = await Warehouse.findByIdAndRemove(id);

    if (warehouse === null)
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    else
      return res
        .status(200)
        .json({ success: true, message: "Eliminado con exito!" });
  }
};

module.exports = WarehouseController;
