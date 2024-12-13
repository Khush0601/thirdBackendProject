const productModel = require('../Models/product.model')
const ProductModel=require('../Models/product.model')
const mongoose=require("mongoose")
exports.createProduct=async(req,res)=>{
    console.log(req.body)
   try{
    const productDataFromReq={
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        shortDescription:req.body.description.substring(0,30).concat('...'),
        price:req.body.price,
        author:req.body.author,
        type:req?.body?.type,
        bookAvailable:req.body.bookAvailable,
      }
      if(!productDataFromReq.type){
     productDataFromReq.price='0',
     productDataFromReq.bookAvailable='Free'
      }

    
      const savedProduct=await ProductModel.create(productDataFromReq)
      res.status(201).send(savedProduct)
   }
   catch(err){
    console.log('error while creating book',err.message)
    res.status(500).send({
        message:err.message??'server error'
    })
   }
}
exports.getProduct=async(req,res)=>{
 try{
   const products=await ProductModel.find({})
   res.status(200).send(products)
 }
 catch(e){
    res.status(500).send({
        message:e.message??'server error'
    })
 }
}

exports.getproductById=async(req,res)=>{
  const productId=req.params.productId
  if(!mongoose.Types.ObjectId.isValid(productId)){
    return res.status(400).send({
      message:'invalid ProductId'
    })
  }
 try{
  const productDetailsById=await productModel.findById(productId)
  console.log(productDetailsById)
  if(!productDetailsById){
     return res.status(404).send({
      message:'product not found'
    })
 }
 else{
   return res.status(200).send(productDetailsById)
 }
 }
 catch(e){
  res.status(500).send({
    message:e.message??'server error'
})
 }
}

exports.searchProducts=async(req,res)=>{
 try{
  const search=req.query.search
  console.log(search)
  if(!search){
    return res.status(400).send({
      error:"query is required"
    })
  }
  const products=await ProductModel.find({
    name: { $regex: search } 
  })
  console.log(products)
  res.status(200).send(products)
 }
 catch(error){
  res.status(500).send({
    error:"an error occured while searching"
  })
 }
}

exports.getLatestProduct=async(req,res)=>{
  try{
    const latestItems = await ProductModel.find()
    .sort({ createdAt: -1 }) 
    .limit(10)
    res.status(200).send(latestItems)
  }
  catch(e){
    res.status(200).send({
      message:e
    })
  }
}