var express = require('express');
var router = express.Router();
const ordertimelineSchema = require('../Models/ordertimeline');





router.get('/',async function(req, res) {

  
    try {
        const list =await ordertimelineSchema.find();
        res.send({
            list,
            statusCod:200
        })  
    } catch (error) {
        res.send({
            statusCode:500
        })
    }
})


router.post('/ordertimeline',async function(req, res) {
    try {
        console.log(req.body)
        const ordertimeline =await ordertimelineSchema.create(req.body);
        res.send({
            ordertimeline,
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
