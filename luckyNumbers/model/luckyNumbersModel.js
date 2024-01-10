const mongoose = require("mongoose");

const luckyNumSchema = new mongoose.Schema(
  {
    redeemCode: { type: String, require: true, unique: true },
    rewardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reward",
      require: true,
    },
    redeemCodeStatus: {
      type: String,
      enu: ["Available", "Requested", "Out", "Preset"],
      default: "Available",
    },
    outTime: {
      type: Date,
    },
    presetStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const LuckyNumbers = mongoose.model("LuckyNumbers", luckyNumSchema);
module.exports = LuckyNumbers;
