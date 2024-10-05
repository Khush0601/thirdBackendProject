const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        lowercase:true,
    },
    userId:{
        type:String,
        required:true,
        unique:true,
        minlength:8,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    userType:{
        type:String,
        required:true,
        default:'BUYER'
    },
    createAt:{
        default:()=>{
            return Date.now()
        },
        immutable:true,
    },
    updatedAt:{
        default:()=>{
            return Date.now()
        },
       
    }

})