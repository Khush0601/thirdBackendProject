const ProductRatingModel=require("../Models/productRating.model")
const ProductModel=require('../Models/product.model')
exports.addRating=async(req,res)=>{
  const ratingDetailsFromReq={
    userName:req.body.userName,
    userId:req.body.userId,
    ratingCount:req.body.ratingCount,
    productId:req.body.productId
  }
  try{
  const findProduct=await ProductModel.findById(ratingDetailsFromReq.productId) 
  const saveRating=await ProductRatingModel.create(ratingDetailsFromReq)
  //console.log(saveRating)
  findProduct.rating.push(saveRating._id)
  await findProduct.save()
  res.status(201).send(saveRating)
  }
  catch(e){
    //console.log(e.message)
   res.status(500).send(e.message)
  }
}

exports.getRatingOfProductId=async(req,res)=>{
    const productId=req.params.productId
    // //console.log(productId)
    try{
    const ratingList=await ProductRatingModel.find({productId:productId})
    const total=ratingList.reduce((acc,curr)=>acc+curr.ratingCount,0)
    const average=total/ratingList.length
    res.status(200).send({
      averageValue:average|| "N/A"
    })
    }
    catch(e){
        //console.log(e.message)
    res.status(500).send(e.message)
    }
}