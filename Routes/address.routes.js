const addressController=require("../Controllers/address.controller")
module.exports=(app)=>{
    app.post('/thirdProject/api/v1/user/addAddress',addressController.addAddress)
}