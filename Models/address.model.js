const mongoose=require("mongoose")
const addressSchema=new mongoose.Schema({
 userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'user',
    required:true
 },
 street:{
    type:String,
    required:true,
 },
 city:{
    type:String,
    required:true,
 },
 state:{
    type:String,
    required:true,
 },
 pincode:{
    type:String,
    required:true,
 },

})
module.exports=mongoose.model('address',addressSchema)