const mongoose=require("mongoose")

const ratingSchema=new mongoose.Schema({
userName:{
   type:String,
   required:true
},
userId:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'user',
      required:true
},
ratingCount:{
      type:Number,
      required:true,
      min:1,
      max:5,

},
productId:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'product',
      required:true
}
})
module.exports=mongoose.model('rating',ratingSchema)