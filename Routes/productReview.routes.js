const productReviewController=require("../Controllers/productReview.controller")

module.exports=(app)=>{
app.post("/thirdProject/api/v1/productReview/addReview",productReviewController.addReview)
}