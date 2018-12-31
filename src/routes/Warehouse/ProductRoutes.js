const router = require("express-promise-router")();
const controller = require("../../controllers/Warehouse/ProductController");

router.get("/", controller.getAll);
router.post("/", controller.new);
router.get("/:productId", controller.get);
router.put("/:productId", controller.update);
router.delete("/:productId", controller.delete);

module.exports = router;
