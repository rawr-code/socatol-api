const express = require("express");
const router = express.Router();
const controller = require("../../controllers/User/UserController");

router.post("/register", controller.Register);
router.post("/login", controller.Login);

module.exports = router;
