const ProductRatingController=require("../Controllers/productRating.controller")

module.exports=(app)=>{
    app.post("/thirdProject/api/v1/productRating/addRating",ProductRatingController.addRating)
    app.get("/thirdProject/api/v1/productRating/:productId/getRating",ProductRatingController.getRatingOfProductId)
}