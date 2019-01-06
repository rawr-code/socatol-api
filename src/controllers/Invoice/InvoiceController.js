const { User } = require("../../models/User");
const { Presentation } = require("../../models/Warehouse");

const {
  Invoice,
  PurchaseInvoice,
  SalesInvoice,
  Supplider,
  Client
} = require("../../models/Invoice");

const InvoiceController = {
  getAll: async (req, res) => {
    const invoices = await Invoice.find({}, [
      "number",
      "type",
      "description",
      "dateEmit",
      "paid"
    ]);

    return res.status(200).json(invoices);
  },

  get: async (req, res) => {
    const { invoiceId } = req.params;
    let invoice = await Invoice.findById(invoiceId)
      .populate("user", "username")
      .populate("fees");

    if (invoice === null) {
      return res
        .status(404)
        .json({ success: false, message: "No encontrado." });
    } else {
      if (invoice.type === "purchase") {
        invoice.details = await PurchaseInvoice.findById(
          invoice.details
        ).populate("supplider", { populate: { path: "personalInfo" } });
      } else {
        invoice.details = await SalesInvoice.findById(invoice.details)
          .populate("presentations", ["name", "price", "stock", "product"])
          .populate("client", { populate: { path: "personalInfo" } });
      }

      return res.status(200).json(invoice);
    }
  },

  new: async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (user === null) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado." });
    } else {
      const { description, dateEmit, paymentType, details } = req.body;
      let newInvoice = new Invoice({
        user,
        type,
        description,
        dateEmit,
        paymentType
      });

      if (type === "purchase") {
        const supplider = await Supplider.findById(details.supplider);

        if (supplider === null) {
          return res
            .status(404)
            .json({ success: false, message: "Proveedor no encontrado." });
        } else {
          const products = details.products;
          const newPurchaseInvoice = new PurchaseInvoice({
            invoice: newInvoice,
            supplider,
            products
          });
          await newInvoice.save();
          await newPurchaseInvoice.save();
          newInvoice.details = newPurchaseInvoice;
          await newInvoice.save();
          supplider.invoices.push(newInvoice);
          await supplider.save();

          return res
            .status(201)
            .json({ success: true, message: "Registrado con exito!" });
        }
      } else {
        const client = await Client.findById(details.client);

        if (client === null) {
          return res
            .status(404)
            .json({ success: false, message: "Cliente no encontrado." });
        } else {
          const presentations = details.products;
          const presentationsIdPrice = [];
          await presentations.map(async (_id, price) => {
            const presentation = await Presentation.findById(_id);

            if (presentation === null) {
              return res.status(404).json({
                success: false,
                message: "Presentación no encontrado."
              });
            } else {
              presentationsIdPrice.push({ presentation, price });
            }
          });

          const newSalesInvoice = new SalesInvoice({
            invoice: newInvoice,
            address: details.address,
            presentations: presentationsIdPrice,
            client
          });

          await newInvoice.save();
          await newSalesInvoice.save();
          newInvoice.details = newSalesInvoice;
          await newInvoice.save();

          client.invoices.push(newInvoice);
          await client.save();

          return res
            .status(201)
            .json({ success: true, message: "Registrado con exito!" });
        }
      }
    }
  },

  update: async (req, res) => {
    const { invoiceId } = req.params;
    const { description, paymentType, paid } = req.body;
    const data = { description, paymentType, paid };
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
