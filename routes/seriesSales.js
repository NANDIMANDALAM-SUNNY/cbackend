var express = require('express');
var router = express.Router();
const seriessales = require('../Models/seriessales');






router.get('/',async function(req, res) {

  
    try {
        const seriessaleslist =await seriessales.find();
        res.send({
            seriessaleslist,
            statusCod:200
        })  
    } catch (error) {
        res.send({
            statusCode:500
        })
    }
})


router.post('/seriessales',async function(req, res) {
    try {
        console.log(req.body)
        const seriessalesData =await seriessales.create(req.body);
        res.send({
            seriessalesData,
            statusCod:200
        })  
    } catch (error) {
        console.log(error)
        res.send({
            statusCode:500,
            error
        })
    }
});





module.exports = router;
