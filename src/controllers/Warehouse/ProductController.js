const { Product, Warehouse } = require("../../models/Warehouse");

const ProductController = {
  getAll: async (req, res) => {
    const products = await Product.find({});

    return res.status(200).json(products);
  },

  get: async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    return res.status(200).json(product);
  },

  new: async (req, res) => {
    try {
      const { name, description, warehouseId } = req.body;
      const warehouse = await Warehouse.findById(warehouseId);
      const newProduct = new Product({ name, description, warehouse });
      await newProduct.save();

      return res.status(201).json({
        newProduct,
        success: true,
        message: "Registrado con exito!"
      });
    } catch (err) {
      return res.status(500).json({
        message: "Ocurrio un error al registrar.",
        error: err
      });
    }
  },

  update: async (req, res) => {
    // const { warehouseId } = req.params;
    // const { name, code } = req.body;
    // const data = { name, code };
    // await Warehouse.findByIdAndUpdate(warehouseId, data);

    // res.status(200).json({ success: true, message: "Actualizado con exito!" });
    try {
      const { productId } = req.params;
      console.log(productId);
      const { name, description } = req.body;
      console.log(req.body);
      const data = { name, description };
      await Warehouse.findByIdAndUpdate(productId, data);

      res
        .status(200)
        .json({ success: true, message: "Actualizado con exito!" });
    } catch (err) {
      return res.status(500).json({
        message: "Ocurrio un error al actualizar.",
        error: err
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { productId } = req.params;
      await Product.findByIdAndRemove(productId);

      res.status(200).json({ success: true, message: "Eliminado con exito!" });
    } catch (err) {
      return res.status(500).json({
        message: "Ocurrio un error al eliminar.",
        error: err
      });
    }
  }
};

module.exports = ProductController;
