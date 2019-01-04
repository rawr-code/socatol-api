const { Invoice } = require("../../models/Invoice");
const { User } = require("../../models/User");
const { Supplider, Client } = require("../../models/Warehouse");

const InvoiceController = {
  getAll: async (req, res) => {
    const invoices = await Invoice.find({}, [
      "type",
      "number",
      "dateEmit",
      "paymentType",
      "paid",
      "supplider",
      "client"
    ]);

    return res.status(200).json(invoices);
  },

  get: async (req, res) => {
    const { invoiceId } = req.params;
    const invoice = await Invoice.findById(invoiceId)
      .populate("user", "username")
      .populate("presentations", ["name", "price", "stock", "product"])
      .populate("fees");

    if (invoice === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Registrado con exito!" });
    }
  },
  // datos-----
  //"number",
  //"address",
  //"dateEmit",
  //"paymentType",
  //"paid",

  // ----------
  //"type",
  //"products",
  //"user",
  //"supplider",
  //"client",
  //"presentations",
  //"fees",
  new: async (req, res) => {
    const { userId, type, products, presentations, ...data } = req.body;
    const user = await User.findById(userId);

    if (user === null && user.active) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado." });
    } else {
      const newInvoice = new Invoice({ type, ...data });

      if (type === "purchase") {
        const supplider =
          data.supplider.id && (await Supplider.findById(data.supplider.id));

        if (supplider === null) {
          return res
            .status(404)
            .json({ success: false, message: "Proveedor no encontrado." });
        } else {
          newInvoice.supplider = supplider;
          newInvoice.products = products;
          await newInvoice.save();

          return res
            .status(201)
            .json({ success: true, message: "Registrado con exito!" });
        }
      } else {
        const client =
          data.client.id && (await Client.findById(data.client.id));

        if (client === null) {
          return res
            .status(404)
            .json({ success: false, message: "Cliente no encontrado." });
        } else {
          newInvoice.client = client;
          newInvoice.presentations = presentations;
          await newInvoice.save();

          return res
            .status(201)
            .json({ success: true, message: "Registrado con exito!" });
        }
      }
    }
  },

  update: async (req, res) => {
    const { invoiceId } = req.params;
    const data = req.body;
    const invoice = await Invoice.findByIdAndUpdate(invoiceId, data);

    if (invoice === null) {
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
    const { invoiceId } = req.params;
    const invoice = await Invoice.findByIdAndRemove(invoiceId);

    if (invoice === null) {
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

module.exports = InvoiceController;
