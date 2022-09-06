const mongoose = require("mongoose");

const ICommand = mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
  username: { type: String, require: true },
  command: { type: String, require: true },
  code: { type: String, require: true },
  weight: { type: Number, require: true },
  price: { type: Number, require: true },
  daySet: { type: Date, require: true },
  isSuccess: { type: Boolean, require: true, default: false },
  isUnlimited: { type: Boolean, require: true },
  option: { type: String, require: true },
});

const Command = mongoose.model("Command", ICommand);
module.exports.Command = Command;
