const { Account } = require("../../models/Bank");
const { PersonalInfo } = require("../../models/User");

const AccountController = {
  getAll: async (req, res) => {
    const accounts = await Account.find({}, [
      "number",
      "type",
      "bank",
      "owner"
    ]);

    return res.status(200).json(accounts);
  },
  get: async (req, res) => {
    const { accountId } = req.params;
    const account = await Account.findById(accountId, [
      "number",
      "type",
      "bank",
      "owner"
    ])
      .populate("bank", ["name", "code"])
      .populate({ path: "owner", model: "PersonalInfo" });

    if (account === null) {
      return res.status(404).json({ succes: false, message: "No encontrado." });
    } else {
      return res.status(200).json(account);
    }
  },
  new: async (req, res) => {
    const { perfonalInfoId, ...data } = req.body;
    const personalInfo = await PersonalInfo.findById(perfonalInfoId);

    if (perfonalInfoId === null) {
      return res.status(404).json({ succes: false, message: "No encontrado." });
    } else {
      const newAccount = new Account({ personalInfo, ...data });
      await newAccount.save();

      return res
        .status(201)
        .json({ succes: true, message: "Registrado con exito!" });
    }
  },
  update: async (req, res) => {
    const { accountId } = req.params;
    const data = req.body;
    const account = await Account.findByIdAndUpdate(accountId, data);

    if (account === null) {
      return res.status(404).json({ succes: false, message: "No encontrado." });
    } else {
      return res
        .status(200)
        .json({ succes: true, message: "Actualizado con exito!" });
    }
  },
  delete: async (req, res) => {
    const { accountId } = req.params;
    const account = await Account.findByIdAndRemove(accountId);

    if (account === null) {
      return res.status(404).json({ succes: false, message: "No encontrado." });
    } else {
      return res
        .status(200)
        .json({ succes: true, message: "Eliminado con exito!" });
    }
  }
};

module.exports = AccountController;
