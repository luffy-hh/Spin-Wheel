const mongoose = require("mongoose");

const moreWinnerSchema = mongoose.Schema({
  name: { type: String, require: true },
  moreWin: { type: String, require: true },
});

const MoreWinner = mongoose.model("MoreWinner", moreWinnerSchema);
module.exports = MoreWinner;
