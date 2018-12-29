const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
  name: String,
  active: Boolean
});

module.exports = model("Role", RoleSchema);
