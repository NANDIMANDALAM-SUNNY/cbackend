const mongoose = require('mongoose');



const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    instock:{
        type:Number,
        required:true,
    },
},
{timestamps:true,}
)

module.exports = mongoose.model('product',productSchema);