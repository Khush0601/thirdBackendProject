const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        required:true,
        enum:['CUSTOMER','ADMIN'],
        default:()=>{
            return 'CUSTOMER'
        }
    },
   
    productList:{
       type:[mongoose.SchemaTypes.ObjectId],
       ref:"products",
       default:[]
    },
    addresses:{
      type:[mongoose.SchemaTypes.ObjectId],
      ref:'userAddress',
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

})
module.exports=mongoose.model('user',userschema)