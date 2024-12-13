const mongoose =require("mongoose")

const contactSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true, 
    },
    mobile:{
        type:String,
        required:true,
        
    },
    query:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    }
})
module.exports=mongoose.model('contact',contactSchema)
