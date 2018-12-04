import promiseRouter from "express-promise-router";
import controller from "../controllers/productController";

const router = promiseRouter();

router.get("/product", controller.getAll);
router.post("/product", controller.new);
router.get("/product/:productId", controller.get);
router.put("/product/:productId", controller.update);
router.delete("/product/:productId", controller.delete);

router.post("/product/:productId/variants", controller.newProductVariant);

export default router;
