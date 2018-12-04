import Variant from "../models/Variant";

const VariantController = {
  getAll: async (req, res) => {
    const variants = await Variant.find({});
    res.status(200).json({ variants });
  },

  get: async (req, res) => {
    const { variantId } = req.params;
    const variant = await Variant.findById(variantId);
    res.status(200).json(variant);
  },
  new: async (req, res) => {},
  update: async (req, res) => {},
  delete: async (req, res) => {}
};

export default VariantController;
