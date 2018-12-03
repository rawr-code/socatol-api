import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  price: String
});

export default model("Product", ProductSchema);
