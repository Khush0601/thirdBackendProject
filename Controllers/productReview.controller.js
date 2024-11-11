const ProductReviewModel=require("../Models/ProductReview.model")
 const ProductModel=require("../Models/product.model")
exports.addReview=async(req,res)=>{
try{
    const reviewDetailsFromReq={
        userName:req.body.userName,
        userId:req.body.userId,
        userImage:req.body.userImage,
        reviewMessage:req.body.reviewMessage,
        productId:req.body.productId,
    }
    const findProduct=await ProductModel.findById(reviewDetailsFromReq.productId)
    const saveReview=await ProductReviewModel.create(reviewDetailsFromReq);
    findProduct.review.push(saveReview._id);
     await findProduct.save()
    const requiredReviewData={
        userName:saveReview.userName,
        userId:saveReview.userId,
        userImage:saveReview.userImage,
        reviewMessage:saveReview.reviewMessage,
        productId:saveReview.productId
}
    res.status(201).send(requiredReviewData)
}

catch(e){
 res.status(500).send(e.message)
}
}

exports.getReviewOfProductId=async(req,res)=>{
    const productId=req.params.productId
try{
    const review=await ProductReviewModel.find({productId:productId})
    res.status(200).send(review)
 }
catch(e){
    res.status(500).send({
        message:e.message??'server error'
    })
}
}