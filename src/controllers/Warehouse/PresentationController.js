const { Presentation, Product } = require("../../models/Warehouse");

const PresentationController = {
  getAll: async (req, res) => {
    const presentations = await Presentation.find({});

    return res.status(200).json(presentations);
  },

  get: async (req, res) => {
    const { presentationId } = req.params;
    const presentation = await Presentation.findById(presentationId).populate(
      "product",
      ["name", "description"]
    );

    if (presentation === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      return res.status(200).json({ success: true, presentation });
    }
  },

  new: async (req, res) => {
    const { productId, ...data } = req.body;
    const product = await Product.findById(productId);

    if (product === null) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado." });
    } else {
      const newPresentation = new Presentation({ ...data });
      newPresentation.product = product;
      await newPresentation.save();
      product.presentations.push(newPresentation);
      await product.save();

      return res
        .status(201)
        .json({ success: true, message: "Registrado con exito!" });
    }
  },

  update: async (req, res) => {
    const { presentationId } = req.params;
    const data = req.body;
    const presentation = await Presentation.findByIdAndUpdate(
      presentationId,
      data
    );

    if (presentation === null) {
      return res.status(404).json({ success: false, message: "No encontrado" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Actualizado con exito!" });
    }
  },

  delete: async (req, res) => {
    const { presentationId } = req.params;
    const presentation = await Presentation.findByIdAndDelete(presentationId);

    if (presentation === null) {
      return res.status(404).json({ success: false, message: "No encontrado" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Eliminado con exito!" });
    }
  }
};

module.exports = PresentationController;
