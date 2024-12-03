const productModel=require("../Models/product.model")
const orderModel=require("../Models/order.model")
exports.onPayment=async(req,res)=>{
    const productId=req.body.productId;
    const userId=req.body.userId;
    const addressId=req.body.addressId;
try{
 const product=await productModel.findById(productId)
 let orderObj={
 productId:product._id,
userId:userId,
addressId:addressId,
productName:product.name,
productDescription:product.shortDescription,
productImage:product.image,
Amount:product.price,

 }
 
 let savedOrder=await orderModel.create(orderObj)
 res.status(201).send({
    message:'order created'
 })
}
catch(e){
console.log(e)
}
}