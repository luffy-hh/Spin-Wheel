const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    rewardName: { type: String, require: true },
    rewardImage: { type: String, require: true },
      url:{type:String,require:true},
    rewardQuantity: { type: Number, require: true },
    presetStatus: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Reward = mongoose.model("Reward", rewardSchema);
module.exports = Reward;
