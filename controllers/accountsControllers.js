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
  const { phone, item_name, credit,debit, date, remarks } = req.body;
  // console.log(req.body)
  const last_transection = await Transection.find().sort({$natural:-1}).limit(1)
  var last_transection_balance = 0;
  if(last_transection.length == 0)
    last_transection_balance = 0;
  else
    last_transection_balance = last_transection[0].balance
  
  // console.log(last_transection)


  try {
    const new_transection = await Transection.create({
      phone,
      item_name,
      credit,
      debit,
      date,
      remarks,
      balance: parseInt(credit)>0?parseInt(credit)+parseInt(last_transection_balance):parseInt(last_transection_balance) - parseInt(debit)
    });
    // let cust = await Customer.find({ phone: phone });
    // console.log(cust);
    // let new_bal =  parseFloat(cust[0].balance)+ parseFloat(amount);
    // console.log(new_bal);
    // await Customer.findOneAndUpdate({ phone: phone }, { balance: new_bal, lastUpdated : date });
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
    if(customer.length == 0){
      // res.send({error:'Customer not found with given contact'})
      res.render('error', {error:'Customer not found with given contact'})
      return
    }
    var last_transection = await Transection.find({ phone: req.query.phone }).sort({$natural:-1}).limit(1)
    
    var lastUpdated;
    var balance
    if(last_transection.length == 0){
      console.log(customer)
      lastUpdated = customer[0].account_creation_date
      balance = 0
    }
    else{
      lastUpdated= last_transection[0].time
      balance = last_transection[0].balance
    }
    // console.log("Last transection is: "+last_transection.length)
    // console.log({ customer:{...customer[0]._doc, lastUpdated: last_transection[0].time, balance: last_transection[0].balance}})
    res.render("accounts/customer",  { customer:new Array({...customer[0]._doc, lastUpdated:lastUpdated , balance:balance})} );
  } catch (err) {
    res.send({"error": err});
  }
};

module.exports.create_account_get = (req, res) => {
  res.render("accounts/create_account");
};

module.exports.create_account_post = async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    const check_customer = await Customer.find({phone})
    // console.log(check_customer)
    if(check_customer.length!=0){
      res.send({'error':'Customer already registered with name :'+check_customer.name})
      return
    }    
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
    res.status(400).send({'error':err.message});
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


module.exports.error_get = (req, res)=>{
  res.render('error', {error: req.error})
}