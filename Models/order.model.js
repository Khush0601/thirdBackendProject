const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
productId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'product',
    required:true
},
userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'user',
    required:true
},
addressId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'address',
    required:true
},
paymentStatus:{
     type:String,
     enum:['pending','success','failure'],
     default:()=>{
        return 'pending'
},
     },
transactionId:{
 type:String,
 
},
productName:{
type:String,
required:true
},
productDescription:{
type:String,
required:true
},
productImage:{
type:String,

},
Amount:{
type:String
},
quantity:{
    type:String,
    default:1
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
module.exports=mongoose.model('order',orderSchema)