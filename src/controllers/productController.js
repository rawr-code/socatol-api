import Product from "../models/Product";
import Variant from "../models/Variant";
import Provider from "../models/Provider";

const ProductController = {
  getAll: async (req, res) => {
    const products = await Product.find({}).populate({
      path: "variants",
      model: "Variant",
      populate: {
        path: "providers.provider",
        model: "Provider"
      }
    });

    res.status(200).json({ products });
  },

  get: async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  },

  new: async (req, res) => {
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.status(200).json(product);
  },
  update: async (req, res) => {
    const { productId } = req.params;
    const { name, variants } = req.body;
    const newProduct = { name };
    const oldProduct = await Product.findByIdAndUpdate(productId, newProduct);
    res.status(200).json({ success: true });
  },

  delete: async (req, res) => {
    const { productId } = req.params;
    await Product.findByIdAndRemove(productId);
    res.status(200).json({ success: true });
  },

  newProductVariant: async (req, res) => {
    const { productId } = req.params;
    let { variants = [], providerId } = req.body;
    let product = await Product.findById(productId);
    let provider = await Provider.findById(providerId);
    let test = new Variant({ name: "TEst" });
    test.providers.push({ provider });
    await test.save();
    provider.products.push(test);
    await provider.save();
    product.variants.push(test);
    await product.save();

    res
      .status(200)
      .json({ product, provider: { ...provider }, test: provider });
  }
};

export default ProductController;
