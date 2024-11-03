const mongoose=require("mongoose")
const productSchema={
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    shortDescription:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        default:0,

    },
    author:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['Free','Purchased'],
        default:()=>{
            return "Free"
        }
    },
    rating:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"ratings",
        default:[]
    },
    bookAvailable:{
       type:String,

    },
    review:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"reviews",
        default:[]
    },
    uniqueVisitors:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"users",
        default:[]
    },
    bookLike:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"users",
        default:[]
    },
    createdAt:{
        type:Date,
        default:()=>{
            return Date.now()
        },
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
       
    }
    
}
module.exports=mongoose.model('product',productSchema)