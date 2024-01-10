const mongoose = require("mongoose");

const uiAgentSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  phNum: { type: String, require: true },
});

const UiAgents = mongoose.model("UiAgents", uiAgentSchema);
module.exports = UiAgents;
