const TestimonialModel=require('../Models/testimonial.model')
exports.createTestimonial=async(req,res)=>{
    try{
     const testimonialDetails={
        userId:req.body.userId,
        userName:req.body.userName,
        description:req.body.description
     }
     const saveTestimonialsDetails=await TestimonialModel.create(testimonialDetails)
     res.status(201).send(saveTestimonialsDetails)
    }
    catch(e){
         //console.log(e)
         res.status(500).send(e)
    }
}

exports.getTestimonials=async(req,res)=>{
    try{
   const getAllTestimonials=await TestimonialModel.find({})
   res.status(200).send(getAllTestimonials)
    }
    catch(e){
        //console.log(e)
   res.status(500).send(e)
    }
}