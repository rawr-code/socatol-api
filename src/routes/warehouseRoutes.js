import promiseRouter from "express-promise-router";
import controller from "../controllers/warehouseController";

const router = promiseRouter();

router.get("/warehouse", controller.getAll);
router.post("/warehouse", controller.new);
router.get("/warehouse/:warehouseId", controller.get);
router.put("/warehouse/:warehouseId", controller.update);
router.delete("/warehouse/:warehouseId", controller.delete);

export default router;
