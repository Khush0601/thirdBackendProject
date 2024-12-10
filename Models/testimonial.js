const mongoose =require ('mongoose')

const testimonialSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    description:{
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
module.exports=mongoose.model('testimonial',testimonialSchema)