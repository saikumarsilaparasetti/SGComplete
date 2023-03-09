const mongoose = require('mongoose')

const tool_trans_schema = new mongoose.Schema({
    tool:{
        type:String,
        required:true
    },
    tool_id:{
        type: String,
        required:true
    },
    customer_name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: new Date()
    },
    photo_url:{
        type:String 
    },
    
    remarks:{
        type:String,
        
    },
    returned:{
        type:Boolean,
        default:false
    }    
})

const Tool_transection = new mongoose.model('tool_transection', tool_trans_schema)
module.exports = Tool_transection