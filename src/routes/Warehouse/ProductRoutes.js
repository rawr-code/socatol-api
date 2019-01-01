const router = require("express-promise-router")();
const controller = require("../../controllers/Warehouse/ProductController");

router.get("/", controller.getAll);
router.post("/", controller.new);
router.get("/:id", controller.get);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
