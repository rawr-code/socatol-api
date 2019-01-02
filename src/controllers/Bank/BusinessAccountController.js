const { BusinessAccount, Account } = require("../../models/Bank");

const BusinessAccountController = {
  getAll: async (req, res) => {
    const businessAccounts = await BusinessAccount.find({}, [
      "name",
      "account"
    ]);

    return res.status(200).json(businessAccounts);
  },

  get: async (req, res) => {
    const { businessAccountId } = req.params;
    const businessAccount = await BusinessAccount.findById(
      businessAccountId
    ).populate("account", ["number", "type", "bank", "owner"]);

    if (businessAccount === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      return res.status(200).json(businessAccount);
    }
  },

  new: async (req, res) => {
    const { accountId, ...data } = req.body;
    const account = await Account.findById(accountId);

    if (account === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      const businessAccount = new BusinessAccount({ account, ...data });
      await businessAccount.save();

      return res
        .status(200)
        .json({ success: true, message: "Registrado con exito!" });
    }
  },

  update: async (req, res) => {
    const { businessAccountId } = req.params;
    const data = req.body;
    const businessAccount = await BusinessAccount.findByIdAndUpdate(
      businessAccountId,
      data
    );

    if (businessAccount === null) {
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
    const { businessAccountId } = req.params;
    const businessAccount = await BusinessAccount.findByIdAndRemove(
      businessAccountId
    );

    if (businessAccount === null) {
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

module.exports = BusinessAccountController;
