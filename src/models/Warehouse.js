import { Schema, model } from "mongoose";

const warehouseSchema = new Schema({
  name: String,
  code: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

export default model("Warehouse", warehouseSchema);
