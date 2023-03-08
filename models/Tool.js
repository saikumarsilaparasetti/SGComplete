const mongoose =  require('mongoose')

const toolSchema = new mongoose.Schema({
    tool:{
        type: String,
        required: true
    },
    default_rent:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: new Date()
    },
    remarks:{
        type: String,
    },
    available:{
        type:Boolean,
        default:true
    }
})
const Tool = mongoose.model('tool', toolSchema)
module.exports = Tool

