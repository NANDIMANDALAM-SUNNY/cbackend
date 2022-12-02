const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const seriesSalesSchema = mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    data :{
        type: [Number],
        required: true
    },
},
{timestamps:true,}
)

module.exports = mongoose.model('seriessales',seriesSalesSchema);