const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", require: true },
  luckyNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LuckyNumbers",
    require: true,
  },
  requested: {
    type: Date,
    require: true,
  },
  draw: { type: Boolean, default: false },
  reward: { type: mongoose.Schema.Types.ObjectId, ref: "Reward" },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
