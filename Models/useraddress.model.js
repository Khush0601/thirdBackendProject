const mongoose=require("mongoose")
const addressSchema=new mongoose.Schema({
 user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'user',
    required:true
 }
})
module.exports=mongoose.model('userAddress',addressSchema)