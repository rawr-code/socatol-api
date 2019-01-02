const router = require("express-promise-router")();
const controller = require("../../controllers/Bank/CurrencyController");

router.get("/", controller.getAll);
router.post("/", controller.new);

router.get("/:currencyId", controller.get);
router.patch("/:currencyId", controller.update);
router.delete("/:currencyId", controller.delete);

module.exports = router;
