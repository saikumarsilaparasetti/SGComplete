const Inventory = require("../models/Inventory");

module.exports.inventory_get = async (req, res) => {
  try {
    const inventory = await Inventory.find({});
    res.render("inventory/inventory", { inventory: inventory });
  } catch (err) {
    res.send(err);
  }
};
module.exports.inventory_post = async (req, res) => {
  try {
    
    let { item_name, quantity_at_SGE, quantity_at_SGG } = req.body;
    // console.log(item_name, quantity_at_SGE, quantity_at_SGG)
    item_name = item_name.replace(/ /g, '_')
    
    const inventory = await Inventory.findOneAndUpdate ({item_name:item_name},{
      item_name: item_name,
      quantity_at_SGG:quantity_at_SGG,
      quantity_at_SGE:quantity_at_SGE,
      last_updated : new Date()
    }, { upsert: true, new: true });
    console.log(inventory)
    res.send(inventory);
  } catch (err) {
    res.status(400).send(err);
  }
};
