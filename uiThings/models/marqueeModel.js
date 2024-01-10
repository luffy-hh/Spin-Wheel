const mongoose = require("mongoose");

const marqueeSchema = mongoose.Schema({
  name: { type: String, require: true },
  text: { type: String, require: true },
});

const marquee = mongoose.model("marquee", marqueeSchema);
module.exports = marquee;
