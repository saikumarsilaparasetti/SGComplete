const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  remarks:{
    type: String
  },
  // balance: {
  //   type: Number,
  //   default: 0.0,
  // },
  account_creation_date: {
    type:Date,
    default: new Date()
  }
  //   type: Date,
  //   default: Date.now,
  // },
});

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
