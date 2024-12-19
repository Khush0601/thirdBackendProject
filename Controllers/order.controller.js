const productModel=require("../Models/product.model")
const orderModel=require("../Models/order.model")
const addressModel =require('../Models/address.model')
const ServerConfig=require("../Configs/server_configs")
const {Cashfree}=require("cashfree-pg")
exports.onPayment=async(req,res)=>{
 try{
    const productId=req.body.productId;
    const userId=req.body.userId;
    const addressId=req.body.addressId;
    //console.log(process.env)
    Cashfree.XClientId = process.env.XCLIENT_ID;
    Cashfree.XClientSecret = process.env.XCLIENT_SECRET;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
const product=await productModel.findById(productId)
const address=await addressModel.findById(addressId)
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
 
 var request = {
    "order_amount": +(savedOrder.Amount),
    "order_currency": "INR",
    "order_id": savedOrder._id,
    "customer_details": {
        "customer_id": savedOrder.userId,
        "customer_phone": address.mobileNo
    },
    "order_meta": {
        "return_url": `${ServerConfig.ClientBase_Url}/home/payment/success/${savedOrder._id}`
    }
};
 let paymentResponse=await Cashfree.PGCreateOrder("2023-08-01", request)
 //console.log(paymentResponse)
 res.status(200).send(paymentResponse.data)
}
catch(e){
// //console.log(e)
res.status(500).send(
    {
         message:'server error'
    }
)
   

}
}

exports.onPaymentStatus = async (req,res) => {
    try{
        Cashfree.XClientId = process.env.XCLIENT_ID;
        Cashfree.XClientSecret = process.env.XCLIENT_SECRET;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
    let orderId= req.body.orderId
    let getOrderResponse = await Cashfree.PGOrderFetchPayments("2023-08-01",orderId)
    orderStatus=''
     if(getOrderResponse.data.filter(transaction => transaction.payment_status === "SUCCESS").length > 0){
          orderStatus = "success"
      }else if(getOrderResponse.data.filter(transaction => transaction.payment_status === "PENDING").length > 0){
          orderStatus = "pending"
      }else{
          orderStatus = "failure"
      }
  
     let savedOrder=await orderModel.findById(getOrderResponse.data[0].order_id);
     //console.log('saved order',savedOrder)
        savedOrder.paymentStatus=orderStatus,
        savedOrder.transactionId=getOrderResponse.data[0].cf_order_id
        await savedOrder.save()
 res.status(200).send({
    message:'order placed successfully'
 })

}
catch(e){
 //console.log(e)
 res.status(500).send({
    message:'server error'
 })
}
}

exports.getAllOrdersOfUserId=async(req,res)=>{
  const userId=req.params.userId;
  try{
 const orderList=await orderModel.find({userId:userId})
 res.status(200).send(orderList)
  }
  catch(e){
 res.status(500).send(e.message)
  }
}