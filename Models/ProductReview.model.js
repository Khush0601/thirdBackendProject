const mongoose=require("mongoose")
const reviewSchema=new mongoose.Schema({
    userName:{
      type:String,
      required:true,
    },
    userImage:{
      type:String,
    },
    userId:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'user',
      required:true
    },

    productId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'product',
        required:true
    },
    reviewMessage:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:()=>{
            return Date.now()
        },
        immutable:true
    }
})
module.exports=mongoose.model('review',reviewSchema)