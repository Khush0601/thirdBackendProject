const orderController=require("../Controllers/order.controller")
module.exports=(app)=>{
   
    app.post('/thirdProject/api/v1/order/onPayment',orderController.onPayment)
   }