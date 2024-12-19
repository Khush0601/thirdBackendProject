const bcrypt=require("bcryptjs")
const UserModel=require('../Models/user.model')
const jwt = require('jsonwebtoken');
const serverConfig=require('../Configs/server_configs')
const TokenToLeave=30 //in days

exports.signUp=async(req,res)=>{
try{
    const userObj={
        name:req.body.name,
        email:req.body.email,
        userId:req.body.userId,
        password:bcrypt.hashSync(req.body.password,8),
     }
     //console.log(userObj)
     const savingUser=await UserModel.create(userObj)
     const message={
        message:'register successfully'
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
    //console.log("error while registering user",err.message)
    res.status(500).send({
     message:err?.message
 })
     
}
}

exports.signIn=async(req,res)=>{
   
try{
   // read entered data
const userIdFromReq=req.body.userId;
const passwordFromReq=req.body.password;
// checking enteredUserId in database if present then fetch user Details
const validUserData=await UserModel.findOne({$or:[{userId:userIdFromReq},{email:userIdFromReq}]})
// //console.log(validUserData)
//if userid is not present in databse
if(!validUserData){
  return res.status(401).send({
      message:"invalid Credentials"
   })
}
//if userId present in database then comapare enteredpassword  with fetched userData password
const isValidPassword=bcrypt.compareSync(passwordFromReq,validUserData.password)
//if entered password is wrong
if(!isValidPassword){
  return res.status(401).send({
      message:"invalid crendentials"
   })
}
// if entered userid and password is valid return userDetails
const{password,...restData}=validUserData._doc
const token = jwt.sign({ userId: restData._id},serverConfig.JWT_SECRET,{ expiresIn: ((60 * 60)*24)*TokenToLeave });
//console.log(token)
restData.token=token;
return res.status(200).send(restData)
}
catch(err){
 //console.log('error while signIn',err.message)
 res.status(500).send({
   message:"internal server error while signIn"
 })
}
}
exports.autoLogin=async(req,res)=>{
try{
   const token=req.params.tokenId;
const decoded = jwt.verify(token,serverConfig.JWT_SECRET );
let userId=decoded.userId

const validUserData=await UserModel.findById(userId)
const{password,...restData}=validUserData._doc
return res.status(200).send(restData)
}
catch(e){
   res.status(500).send({
      message:"internal server error while autoLogin"
    })

}
}