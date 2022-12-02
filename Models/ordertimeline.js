const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ordertimelineSchema = mongoose.Schema({
    title:{
        type: String,
        required: true 
    },
    type :{
        type: String,
        required: true
    },
    time:{
        type : Date,
        default:new Date()
    }
},
)

module.exports = mongoose.model('ordertimeline',ordertimelineSchema);