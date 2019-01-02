const { Bank, Currency } = require("../../models/Bank");

const BankController = {
  getAll: async (req, res) => {
    const banks = await Bank.find({}, ["name", "code", "currency"]).populate({
      path: "currency",
      select: ["name", "code", "simbol"]
    });

    return res.status(200).json(banks);
  },

  get: async (req, res) => {
    const { bankId } = req.params;
    const bank = await Bank.findById(bankId, [
      "name",
      "code",
      "currency"
    ]).populate({ path: "currency", select: ["name", "code", "simbol"] });

    if (bank === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      return res.status(200).json(bank);
    }
  },

  new: async (req, res) => {
    const { currencyId, ...data } = req.body;
    const currency = await Currency.findById(currencyId);

    if (currencyId === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      const newBank = new Bank({ currency, ...data });
      await newBank.save();
      currency.banks.push(newBank);
      await currency.save();

      return res
        .status(201)
        .json({ success: true, message: "Registrado con exito!" });
    }
  },

  update: async (req, res) => {
    const { bankId } = req.params;
    const data = req.body;
    const bank = await Bank.findByIdAndUpdate(bankId, data);

    if (bank === null) {
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
    const { bankId } = req.params;
    const bank = await Bank.findByIdAndRemove(bankId);

    if (bank === null) {
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

module.exports = BankController;
