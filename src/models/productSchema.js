import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  variants: [{ type: Schema.Types.ObjectId, ref: "ProductVariant" }],
  warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse" }
});

export default model("Product", ProductSchema);
