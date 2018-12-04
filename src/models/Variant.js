import { Schema, model } from "mongoose";

const VariantSchema = new Schema({
  name: String,
  providers: [{ provider: { type: Schema.Types.ObjectId, ref: "Provider" } }]
});

export default model("Variant", VariantSchema);
