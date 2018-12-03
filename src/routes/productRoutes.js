import { Router } from "express";
import { getProducts } from "../controllers/productController";
const api = Router();

api.get("/product", getProducts);

module.exports = api;
