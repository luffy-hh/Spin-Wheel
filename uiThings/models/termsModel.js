const mongoose = require("mongoose");

const termsSchema = mongoose.Schema({
  name: { type: String, require: true },
  terms: { type: String, require: true },
});

const Terms = mongoose.model("Terms", termsSchema);
module.exports = Terms;
