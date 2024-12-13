const userController= require("../Controllers/user.controller")

module.exports=(app)=>{
  
app.post('/thirdProject/api/v1/user/signUp',userController.signUp)
app.post('/thirdProject/api/v1/user/signIn',userController.signIn)
app.get('/thirdProject/api/v1/user/autoSignIn/:tokenId',userController.autoLogin)
}