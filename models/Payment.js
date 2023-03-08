const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    phone: {
        type: String,
        required:true
    },
    amount_paid:{
        type:Number,
        required: true
    },
    remaining_balance:{
        type:Number,
        required:true
    },
    date_time:{
        type:Date,
        default: new Date()
    },
    remarks:{
        type: String
    }
})

const Payment = mongoose.model('payment', paymentSchema)

module.exports=Payment