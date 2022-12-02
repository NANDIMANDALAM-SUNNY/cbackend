const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true 
    },
    product :{
        type: String,
        required: true
    },
    quantity :{
        type: String,
        required: true
    },
    delivered:{
        type:Boolean,
        default:false,
    }
},
{timestamps:true,}
)

module.exports = mongoose.model('order',orderSchema);