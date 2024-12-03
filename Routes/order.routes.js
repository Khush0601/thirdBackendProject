const orderController=require("../Controllers/order.controller")
module.exports=(app)=>{
   
    app.post('/thirdProject/api/v1/order/onPayment',orderController.onPayment)
    app.patch('/thirdProject/api/v1/order/onPaymentStatus',orderController.onPaymentStatus)
   }