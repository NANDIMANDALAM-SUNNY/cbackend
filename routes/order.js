var express = require('express');
const { mongo, default: mongoose } = require('mongoose');
const { pipeline } = require('nodemailer/lib/xoauth2');
const orderSchema = require('../Models/order');
var router = express.Router();

/* GET home page. */




router.get('/', function(req, res) {
res.send("Orders route")
});

router.post('/addorder', async (req, res)=> {
    try {
        console.log(req.body)
        const addOrder =await orderSchema.create(req.body);
        res.send({
            addOrder,
            statusCod:200
        })  
    } catch (error) {
        res.send({
            statusCod:500
        })
    }

        

    });


    router.get('/getorders', async (req, res)=> {
        try {
            orderSchema.aggregate( [
                {
                    $lookup:
                      {
                        from: "users",
                        localField: "userName",
                        foreignField: "name",
                        as: "userDetail",
                        pipeline:[
                            {
                                $project:{_id:1,email:1,profile:1,email:1}
                            }
                        ]
                    },
                      
                 },
               {
                $lookup:
                  {
                    from: "products",
                    localField: "product",
                    foreignField: "productName",
                    as: "products",
                    pipeline:[
                        {
                            $project:{productName:1,price:1}
                        }
                    ]
                  }
             },
          
                 
             ] )
                
    .exec((err, result)=>{
        if (err) {
            console.log("error" ,err)
        }
        if (result) {
            console.log(result);
            res.send({
                result
            })
        }
  });
        } catch (error) {
            res.send({
                statusCod:500
            })
        }

    });   


router.get('/updateorder/:_id', async (req, res)=> { 
    try {
        const {_id} = req.params
        const orderDetail = await orderSchema.updateOne({_id},{$set:{delivered:true}})
        res.send({
            statusCode:500,
            orderDetail
        })

    } catch (error) {
        res.send({
            statusCod:500
        })
    }
})



module.exports = router;

