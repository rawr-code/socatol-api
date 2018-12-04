import { Schema, model } from "mongoose";

const providerSchema = new Schema({
  name: String,
  age: Number,
  products: [{ type: Schema.Types.ObjectId, ref: "Variant" }]
});

export default model("Provider", providerSchema);
