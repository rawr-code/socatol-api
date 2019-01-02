const router = require("express-promise-router")();
const controller = require("../../controllers/Bank/AccountController");

router.get("/", controller.getAll);
router.post("/", controller.new);

router.get("/:accountId", controller.get);
router.patch("/:accountId", controller.update);
router.delete("/:accountId", controller.delete);

module.exports = router;
