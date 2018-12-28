const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user.controller");

router.post("/register", Controller.Register);
router.post("/login", Controller.Login);

module.exports = router;
