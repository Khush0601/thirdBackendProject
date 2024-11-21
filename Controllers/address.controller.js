const UserAddressModel=require("../Models/address.model")
const UserModel=require("../Models/user.model")
exports.addAddress=async(req,res)=>{
    const requiredAddressDetails={
        userId:req.body.userId,
        name:req.body.name,
        mobileNo:req.body.mobileNo,
        street:req.body.street,
        city:req.body.city,
        state:req.body.state,
        pincode:req.body.pincode,
        typeOfAddress:req.body.typeOfAddress
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
 exports.getAllAddressesOfUserId=async(req,res)=>{
  const userId=req.params.userId;
  try{
  const addressList=await UserAddressModel.find({userId})
  res.status(200).send(addressList)
  }
  catch(e){
    res.status(500).send(e.message)
  }
 }
