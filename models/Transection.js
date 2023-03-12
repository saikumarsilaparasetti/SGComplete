const mongoose = require("mongoose");

const transectionSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },

  debit: {
    type: Number,
    default:0
  },
  credit:{
    type:Number,
    default:0
  },
  time: {
    type: Date,
    default: Date.now,
  },
  balance:{
    type:Number,
    required:true
  },
  remarks: {
    type: String,
  },
});

const Transection = mongoose.model("transection", transectionSchema);

module.exports = Transection;
