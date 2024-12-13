const contactModel=require('../Models/contact.model')
exports.conatctController=async(req,res)=>{
    try{
        const contactDetails={
            userName:req.body.userName,
            email:req.body.email,
            mobile:req.body.mobile,
            query:req.body.query,
        }
     
        const saveDetails=await contactModel.create(contactDetails)
        res.status(201).send({
            message:"your query submitted successfully"
        })
    }
    catch(e){
     res.status(500).send({
        message:e
     })
    }
}