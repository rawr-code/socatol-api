import promiseRouter from "express-promise-router";
import controller from "../controllers/providerController";

const router = promiseRouter();

router.get("/provider", controller.getAll);
router.post("/provider", controller.new);
router.get("/provider/:providerId", controller.get);
router.put("/provider/:providerId", controller.update);
router.delete("/provider/:providerId", controller.delete);

export default router;
