const mongoose = require("mongoose");

const transectionSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
  },
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
  },
});

const Transection = mongoose.model("transection", transectionSchema);

module.exports = Transection;
