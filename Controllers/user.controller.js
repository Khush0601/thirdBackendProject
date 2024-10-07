const bcrypt=require("bcrypt")
const UserModel=require('../Models/user.model')
exports.signUp=async(req,res)=>{
try{
    const userObj={
        name:req.body.name,
        email:req.body.email,
        userId:req.body.userId,
        password:bcrypt.hashSync(req.body.password,8),
        userType:req.body.userType,
     }
     console.log(userObj)
     const savingUser=await UserModel.create(userObj)
     const message={
        message:' register successfully'
      }
      if(savingUser){
         return res.status(201).send(message)
      }
      else{
      return  res.status(404).send({
         message:"register unsuccessfull"
        })
      }
}
catch(err){
    console.log("error while registering user",err.message)
    res.status(500).send({
     message:"some internal error while registering"
 })
     
}
}

exports.signIn=async(req,res)=>{
try{
   // read entered data
const userIdFromReq=req.body.userId;
const passwordFromReq=req.body.password;
// checking enteredUserId in database if present then fetch user Details
const validUserData=await UserModel.findOne({userId:userIdFromReq})
// console.log(validUserData)
//if userid is not present in databse
if(!validUserData){
   res.status(401).send({
      message:"invalid Credentials"
   })
}
//if userId present in database then comapare enteredpassword  with fetched userData password
const isValidPassword=bcrypt.compareSync(passwordFromReq,validUserData.password)
//if entered password is wrong
if(!isValidPassword){
   res.status(401).send({
      message:"invalid crendentials"
   })
}
// if entered userid and password is valid return userDetails
const{password,...restData}=validUserData._doc
return res.status(200).send(restData)
}
catch(err){
 console.log('error while signIn',err.message)
 res.status(500).send({
   message:"internal server error while signIn"
 })
}
}