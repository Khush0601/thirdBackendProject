const productController=require('../Controllers/product.controller')


module.exports=(app)=>{
 app.post('/thirdproject/api/v1/product/createProduct',productController.createProduct)
 app.get('/thirdProject/api/v1/product/getProduct',productController.getProduct)
 app.get('/thirdProject/api/v1/product/getLatestProduct',productController.getLatestProduct)
 app.get('/thirdProject/api/v1/product/:productId',productController.getproductById)
 app.get('/thirdProject/api/v1/product',productController.searchProducts)

}