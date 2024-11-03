const ProductModel=require('../Models/product.model')
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