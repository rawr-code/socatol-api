const router = require("express-promise-router")();
const controller = require("../../controllers/Warehouse/WarehouseController");

router.get("/", controller.getAll);
router.post("/", controller.new);

router.get("/:warehouseId", controller.get);
router.patch("/:warehouseId", controller.update);
router.delete("/:warehouseId", controller.delete);

module.exports = router;
