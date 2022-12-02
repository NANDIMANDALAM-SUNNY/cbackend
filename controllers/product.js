
const productSchema = require('../Models/product')
const {cloudinary} = require('../utils/cloudinary')


const addproduct = async (req,res)=>{
    try {
        const {productName,image,description,price,category,instock} = req.body;
   if(!productName || !description || !price || !category || !instock ||!image){
    res.send({
        statusCode: 404,
        message: "Please enter all required fields"
    })
   }
   else{
    const uploadResponse = await cloudinary.uploader.upload(req.body.image, {upload_preset: 'testing api',})
    let object ={productName,description,price,category,instock,image:uploadResponse.url}
    const addproduct =await productSchema.create(object)
    res.send({
        statusCode: 200,
        addproduct
    })
   }
    } catch (error) {
        res.send({
            statusCode: 500,
            message: error
        })
    }
}


const getProducts = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) ||5;
        const search = req.query.search || '';
        let sort = req.query.sort || 'createdAt';
        const categoryOptions = [
            "fashion", "mobiles"
        ]
        let category = req.query.category || "All";
        category === "All"?(category = [...categoryOptions]):(category=req.query.category.split(","))
        req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort]);
        const sortBy = {};
        if (sort[1]) {
        sortBy[sort[0]] = sort[1];
        } else {
        sortBy[sort[0]] = 'asc';
        }
        const getproducts = await productSchema.find({ productName: { $regex: search, $options: 'i' } })
        .where("category")
        .in([...category])
        .sort(sortBy)
        .skip(page*limit)
        .limit(limit)
        
        
        const total = await productSchema.countDocuments({
            category:{$in:[...category]},
            name: { $regex: search, $options: 'i' }
        })
        let TotalPrice;
       await productSchema.aggregate(
            [
              {
                $group: {
                    _id : null,
                  total: {
                    $sum: "$price"
                  }
                }
              }
            ],
            function(err, result) {
              if (err) {
                console.log(err)
              } else {
                TotalPrice = result[0].total
                console.log(TotalPrice)
            }
        }
        );
        
        res.send({ statusCode: 200, 
            total,
            page:page+1,
            limit,
            TotalPrice,
            category:categoryOptions,
            getproducts })
    } catch (error) {
       res.send({
        statusCode:500,
        message: "Internal Server Error",
        error: error
       }) 
    }
}



const updateProduct = async (req,res)=>{
    try {
        const {_id} = req.params
        object = req.body
        const updateproduct = await productSchema.updateOne({_id},{$set:object})
        res.send({
            statusCode:200,
            updateproduct
        })
    } catch (error) {
        res.send({
            statusCode:500,
            message: "Internal Server Error",
            error: error
           }) 
    }
} 


const deleteProduct = async (req,res)=>{
    try {
        const {_id} = req.params
        const deleteproduct = await productSchema.deleteOne({_id})
        res.send({
            statusCode:200,
            deleteproduct
        }) 
    } catch (error) {
        res.send({
            statusCode:500,
            message: "Internal Server Error",
            error: error
           }) 
    }
} 

module.exports = {addproduct, getProducts, updateProduct, deleteProduct}