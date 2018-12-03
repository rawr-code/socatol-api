import { Schema, model } from "mongoose";

const productVariantSchema = new Schema({
  name: String,
  providers: [
    {
      price: Number,
      provider: { type: Schema.Types.ObjectId, ref: "Provider" }
    }
  ]
});

export default model("ProductVariant", productVariantSchema);
