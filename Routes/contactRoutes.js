 const conatctController=require('../Controllers/contactController')
module.exports=(app)=>{
  app.post('/thirdProject/api/v1/contact/postContactDetails',conatctController.conatctController)
}