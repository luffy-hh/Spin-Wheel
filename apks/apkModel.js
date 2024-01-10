const mongoose = require("mongoose");

const apkSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  filePath:{type:String,require:true},
  url: { type: String, require: true },
});

const Apk = mongoose.model("Apk", apkSchema);
module.exports = Apk;
