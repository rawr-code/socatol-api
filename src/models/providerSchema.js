import { Schema, model } from "mongoose";

const providerSchema = new Schema({
  name: String,
  age: Number,
  products: [{ type: Schema.Types.ObjectId, ref: "ProductVariant" }]
});

export default model("Provider", providerSchema);
