const router = require("express-promise-router")();
const controller = require("../../controllers/Invoice/InvoiceController");

router.get("/", controller.getAll);
router.post("/", controller.new);

router.get("/:invoiceId", controller.get);
router.patch("/:invoiceId", controller.update);
router.delete("/:invoiceId", controller.delete);

module.exports = router;
