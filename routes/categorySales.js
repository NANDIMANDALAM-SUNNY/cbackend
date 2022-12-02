var express = require('express');
var router = express.Router();
const categorySalesSchema = require('../Models/categorySales');

router.get('/',async function(req, res) {
  
    try {
        const salesDetails =await categorySalesSchema.find();
        res.send({
            salesDetails,
            statusCod:200
        })  
    } catch (error) {
        res.send({
            statusCode:500
        })
    }
});

router.post('/updatesales',async function(req, res) {
    try {
        const updatesales =await categorySalesSchema.create(req.body);
        res.send({
            updatesales,
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
