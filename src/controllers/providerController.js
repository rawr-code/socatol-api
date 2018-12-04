import Provider from "../models/Provider";

const ProviderController = {
  getAll: async (req, res) => {
    const providers = await Provider.find({});
    res.status(200).json({ providers });
  },
  get: async (req, res) => {
    const { providerId } = req.params;
    const provider = Provider.find(providerId);
    res.status(200).json(provider);
  },

  new: async (req, res) => {
    const newProvider = new Provider(req.body);
    const provider = await newProvider.save();
    res.status(200).json(provider);
  },

  update: async (req, res) => {
    const { providerId } = req.params;
    const { name, age } = req.body;
    const newProvider = { name, age };
    const oldProvider = await Provider.findByIdAndUpdate(
      providerId,
      newProvider
    );
    res.status(200).json({ success: true });
  },

  delete: async (req, res) => {
    const { providerId } = req.params;
    await Provider.findByIdAndRemove(providerId);
    res.status(200).json({ success: true });
  }
};

export default ProviderController;
