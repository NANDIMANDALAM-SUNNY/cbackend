var express = require('express');
var router = express.Router();
const countrySalesSchema = require('../Models/countrySales');






router.get('/',async function(req, res) {

  
    try {
        const countrySales =await countrySalesSchema.find();
        res.send({
            countrySales,
            statusCod:200
        })  
    } catch (error) {
        res.send({
            statusCode:500
        })
    }
})


router.post('/updatecountrysales',async function(req, res) {
    try {
        const updatecountrysales =await countrySalesSchema.create(req.body);
        res.send({
            updatecountrysales,
            statusCod:200
        })  
    } catch (error) {
        res.send({
            statusCode:500
        })
    }
});





module.exports = router;
// module.exports={Counting}
