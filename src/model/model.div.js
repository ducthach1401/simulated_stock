const mongoose = require("mongoose");

const IDiv = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
  username: { type: String, require: true },
  code: { type: String, require: true },
  date: { type: String, require: true },
  ratio: { type: Array, require: true },
  isDiv: { type: Boolean, default: false },
});

const Div = mongoose.model("Div", IDiv);
module.exports.Div = Div;
