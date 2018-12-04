import Warehouse from "../models/Warehouse";

const WarehouseController = {
  getAll: async (req, res) => {
    const warehouses = await Warehouse.find({});
    res.status(200).json({ warehouses });
  },

  get: async (req, res) => {
    const { warehouseId } = req.params;
    const warehouse = await Warehouse.findById(warehouseId);
    res.status(200).json(warehouse);
  },

  new: async (req, res) => {
    const newWarehouse = new Warehouse(req.body);
    const warehouse = await newWarehouse.save();
    res.status(200).json(warehouse);
  },

  update: async (req, res) => {
    const { warehouseId } = req.params;
    const { name, code } = req.body;
    const newWarehouse = { name, code };
    const oldWarehouse = await Warehouse.findByIdAndUpdate(
      warehouseId,
      newWarehouse
    );
    res.status(200).json({ success: true });
  },

  delete: async (req, res) => {
    const { warehouseId } = req.params;
    await Warehouse.findByIdAndRemove(warehouseId);
    res.status(200).json({ success: true });
  }
};

export default WarehouseController;
