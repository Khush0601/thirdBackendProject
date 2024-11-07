const ProductReviewModel=require("../Models/ProductReview.model")

exports.addReview=async(req,res)=>{
try{
    const reviewDetailsFromReq={
        userName:req.body.userName,
        userId:req.body.userId,
        userImage:req.body.userImage,
        reviewMessage:req.body.reviewMessage,
        productId:req.body.productId,
    }
    const saveReview=await ProductReviewModel.create(reviewDetailsFromReq)
    const requiredReviewData={
        userName:saveReview.userName,
        userId:saveReview.userId,
        userImage:saveReview.userImage,
        message:saveReview.reviewMessage,
        productId:saveReview.productId
}
    res.status(201).send(requiredReviewData)
}

catch(e){
 res.status(500).send(e.message)
}
}