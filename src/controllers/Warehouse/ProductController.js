const { Product, Warehouse } = require("../../models/Warehouse");

const ProductController = {
  getAll: async (req, res) => {
    const products = await Product.find({});

    return res.status(200).json(products);
  },

  get: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("warehouse", ["name", "code"])
      .populate("presentations");

    if (product === null) {
      return res.status(404).json({ message: "No encontrado." });
    } else {
      return res.status(200).json(product);
    }
  },

  new: async (req, res) => {
    const { warehouseId, name, description } = req.body;
    const newProduct = new Product({ name, description });
    const warehouse = await Warehouse.findById(warehouseId);
    await newProduct.save();

    if (warehouse !== null) {
      newProduct.warehouse = warehouse;
      await newProduct.save();
      warehouse.products.push(newProduct);
      await warehouse.save();
    }

    return res
      .status(201)
      .json({ success: true, message: "Registrado con exito!" });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const product = await Product.findByIdAndUpdate(id, data);

    if (product === null)
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
    const product = await Product.findByIdAndRemove(id);

    if (product === null)
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    else
      return res
        .status(200)
        .json({ success: true, message: "Eliminado con exito!" });
  }
};

module.exports = ProductController;
