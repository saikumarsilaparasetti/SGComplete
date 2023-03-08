const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const Customer = require("../models/Customer");
const Payment = require("../models/Payment");
const Transection = require("../models/Transection");
const User = require("../models/User");

module.exports.accounts_get = (req, res) => {
  res.render("accounts/accounts");
};

module.exports.debit_issue_get = async (req, res) => {
  let customers = [];
  try {
    customers = await Customer.find({});
    res.render("accounts/debit_issue", { customers });
  } catch (err) {
    // console.log(err);
    res.send(err.message);
  }
};

module.exports.debit_issue_post = async (req, res) => {
  //   console.log(req.body);
  const { phone, item_name, amount, date, remarks } = req.body;

  try {
    const new_transection = await Transection.create({
      phone,
      item_name,
      amount,
      date,
      remarks,
    });
    let cust = await Customer.find({ phone: phone });
    console.log(cust);
    let new_bal =  parseFloat(cust[0].balance)+ parseFloat(amount);
    console.log(new_bal);
    await Customer.findOneAndUpdate({ phone: phone }, { balance: new_bal, lastUpdated : date });
    res.send(new_transection);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports.check_account_get = async (req, res) => {
  let customers = [];
  try {
    customers = await Customer.find({});
    res.render("accounts/check_account", { customers: customers });
  } catch (err) {
    // console.log(err);
    res.send(err.message);
  }
};

module.exports.customer_get = async (req, res) => {
  try {
    const customer = await Customer.find({ phone: req.query.phone });

    res.render("accounts/customer", { customer: customer });
  } catch (err) {
    res.send(400).send(err);
  }
};

module.exports.create_account_get = (req, res) => {
  res.render("accounts/create_account");
};

module.exports.create_account_post = async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    const customer = await Customer.create({ name, address, phone });
    res.send(customer);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports.transections_get = async (req, res) => {
  try {
    const transections = await Transection.find({ phone: req.query.phone });
    res.send(transections);
  } catch (err) {
    res.status(400).send(err);
  }
};
// module.exports.get_customers = async (req, res) => {
//   try {
//     const customers = await Customer.find({});
//     res.status(200).send(customers);
//   } catch (err) {
//     // console.log(err);
//     res.error(err.message);
//   }
// };

module.exports.customers_get = async (req, res) => {
  let customers = [];
  try {
    customers = await Customer.find({});
    res.render("accounts/list_customers", { customers: customers });
  } catch (err) {
    // console.log(err);
    res.send(err.message);
  }
};

module.exports.debit_pay_get = async (req, res)=>{
  let customers = [];
  try{
    customers = await Customer.find({})
  res.render('accounts/debit_pay', {customers: customers})
  }catch(err){

  }
}

module.exports.payment_post = async (req, res)=>{
  let {phone, amount_paid,date_time, remarks } = req.body;
  try{
    date_time = (date_time==null || date_time.length == 0)?new Date():date_time
    let customers = await Customer.find({phone:phone});
    let remaining_balance = parseInt( customers[0].balance)
    remaining_balance-=parseInt(amount_paid)
    const payment = await Payment.create({
      phone,
      amount_paid,
      remaining_balance,
      date_time,
      remarks
    })
    // customers[0].balance = remaining_balance
    await Customer.findOneAndUpdate({phone:phone}, {balance:remaining_balance})
    if(payment._id)res.send(payment)
    else res.status(400).send({'error':'error in payment'})
  }catch(err){
    res.send(err)
  }

}