const mongoose=require("mongoose")
const addressSchema=new mongoose.Schema({
 userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'user',
    required:true
 },
 name:{
    type:String,
    required:true,
 },
 mobileNo:{
    type:String,
    required:true,
    minlength: 10,
    maxlength: 10,
  
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
 typeOfAddress:{
    type:String,
    required:true,
    enum:['Home','Work'],
    default:()=>{
      return 'Home'
    }
 },
 isDefault:{
   type:String,
   default:false,
 }

})
module.exports=mongoose.model('address',addressSchema)