const UserAddressModel=require("../Models/address.model")
const UserModel=require("../Models/user.model")
exports.addAddress=async(req,res)=>{
    const requiredAddressDetails={
        userId:req.body.userId,
        street:req.body.street,
       city:req.body.city,
       state:req.body.state,
       pincode:req.body.pincode,
 }
  try{
   const newAddress=await UserAddressModel.create(requiredAddressDetails)
   // now adding to the userModel
   const user=await UserModel.findById(requiredAddressDetails.userId)
   user.addresses.push(newAddress._id)
   await user.save()
   
   res.status(201).send(newAddress)

  }
  catch(e){
    res.status(500).send(e.message)
  }
}
 exports.getAllAddresses=async(req,res)=>{
  try{
  const addressList=await UserAddressModel.find({})
  res.status(200).send(addressList)
  }
  catch(e){
    res.status(500).send(e.message)
  }
 }
