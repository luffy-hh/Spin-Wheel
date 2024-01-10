const mongoose = require("mongoose");

const apkAdsSchema = mongoose.Schema({
    name: { type: String, require: true, unique: true },
    imgPath:{type:String,require:true},
    url: { type: String, require: true },
});

const ApkAds = mongoose.model("ApkAds", apkAdsSchema);
module.exports = ApkAds;