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
      type:String,
    //   mongoose.SchemaTypes.ObjectId
    //   ref:'user',
      required:true
    },

    productId:{
        type:String,
        // // mongoose.SchemaTypes.ObjectId do it after getting productId
        // ref:'product',
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