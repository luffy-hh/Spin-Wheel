const mongoose = require("mongoose");

const adsSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  imgPath:{type:String,require:true},
  url: { type: String, require: true },
});

const Ads = mongoose.model("Ads", adsSchema);
module.exports = Ads;
