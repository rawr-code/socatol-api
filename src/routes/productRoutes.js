const express = require("express");
const api = express.Router();
const ProductCtrl = require("../controllers/productController");

api.get("/product", ProductCtrl.getProducts);

module.exports = api;
