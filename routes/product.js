const express = require('express');
const { addproduct, getProducts, updateProduct, deleteProduct, gettotal } = require('../controllers/product');
const productSchema = require('../Models/product');
var router = express.Router();


router.get('/',(req,res)=>{
    res.json({data:"Hello world"})
})

router.post('/addproduct',addproduct)
router.get('/getproducts',getProducts)
router.put('/updateproduct/:_id', updateProduct)
router.delete('/deleteproduct/:_id', deleteProduct)


// router.post('/addproduct',async (req,res)=>{
//    const {name,description,price,category,instock} = req.body;
//    if(!name || !description || !price || !category || !instock){
//     res.send({
//         statusCode: 404,
//         message: "Please enter all required fields"
//     })
//    }
//    else{
//     let object ={name,description,price,category,instock}
//     const addproduct =await productSchema.create(object)
//     res.send({
//         statusCode: 200,
//         addproduct
//     })
//    }
// })




// router.get('/getproducts',async (req,res)=>{
    // try {
    //     const page = parseInt(req.query.page) -1 || 0;
    //     const limit = parseInt(req.query.limit) ||5;
    //     const search = req.query.search || '';
    //     let sort = req.query.sort || 'createdAt';
    //     const categoryOptions = [
    //         "fashion", "mobiles"
    //     ]
    //     let category = req.query.category || "All";
    //     category === "All"?(category = [...categoryOptions]):(category=req.query.category.split(","))
    //     req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort]);
    //     const sortBy = {};
    //     if (sort[1]) {
    //     sortBy[sort[0]] = sort[1];
    //     } else {
    //     sortBy[sort[0]] = 'asc';
    //     }
    //     const getproducts = await productSchema.find({ name: { $regex: search, $options: 'i' } })
    //     .where("category")
    //     .in([...category])
    //     .sort(sortBy)
    //     .skip(page*limit)
    //     .limit(limit)

    //     const total = await productSchema.countDocuments({
    //         category:{$in:[...category]},
    //         name: { $regex: search, $options: 'i' }
    //     })
    //     res.send({ statusCode: 200, 
    //         total,
    //         page:page+1,
    //         limit,
    //         category:categoryOptions,
    //         getproducts })
    // } catch (error) {
    //    res.send({
    //     statusCode:500,
    //     message: "Internal Server Error",
    //     error: error
    //    }) 
    // }
// })



// router.put('/updateproduct/:_id',async (req,res)=>{
//     try {
//         const {_id} = req.params
//         object = req.body
//         const updateproduct = await productSchema.updateOne({_id},{$set:object})
//         res.send({
//             statusCode:200,
//             updateproduct
//         })
//     } catch (error) {
//         res.send({
//             statusCode:500,
//             message: "Internal Server Error",
//             error: error
//            }) 
//     }
// })


// router.delete('/deleteproduct/:_id', async (req,res)=>{
//     try {
//         const {_id} = req.params
//         const deleteproduct = await productSchema.deleteOne({_id})
//         res.send({
//             statusCode:200,
//             deleteproduct
//         }) 
//     } catch (error) {
//         res.send({
//             statusCode:500,
//             message: "Internal Server Error",
//             error: error
//            }) 
//     }
// })



module.exports = router;
