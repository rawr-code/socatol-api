const { Currency } = require("../../models/Bank");

const CurrencyController = {
  getAll: async (req, res) => {
    const currencys = await Currency.find({}, [
      "name",
      "code",
      "simbol",
      "country"
    ]);

    return res.status(200).json(currencys);
  },
  get: async (req, res) => {
    const { currencyId } = req.params;
    const currency = await Currency.findById(currencyId, [
      "name",
      "code",
      "simbol",
      "country"
    ]).populate("banks", "name");

    if (currency === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      return res.status(200).json(currency);
    }
  },
  new: async (req, res) => {
    const data = req.body;
    const newCurrency = new Currency(data);
    await newCurrency.save();

    return res
      .status(201)
      .json({ success: true, message: "Registrado con exito!" });
  },
  update: async (req, res) => {
    const { currencyId } = req.params;
    const data = req.body;
    const currency = await Currency.findByIdAndUpdate(currencyId, data);

    if (currency === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Actualizado con exito!" });
    }
  },
  delete: async (req, res) => {
    const { currencyId } = req.params;
    const currency = await Currency.findByIdAndRemove(currencyId);

    if (currency === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Eliminado con exito!" });
    }
  }
};

module.exports = CurrencyController;
