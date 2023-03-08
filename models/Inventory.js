const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true,
    
  },
  quantity_at_SGE: {
    type: Number,
    default: 0,
  },
  quantity_at_SGG: {
    type: Number,
    default: 0,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

const Inventory = mongoose.model("inventory", inventorySchema);
module.exports = Inventory;
