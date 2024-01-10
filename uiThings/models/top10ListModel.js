const mongoose = require("mongoose");

const top10ListSchema = mongoose.Schema({
  top: { type: String, require: true, unique: true },
  winnerName: { type: String },
});

const Top10List = mongoose.model("Top10List", top10ListSchema);
module.exports = Top10List;
