const User= require("../models/user.model")
const objConverter=require("../utils/convertUserObject")
exports.findAll=async (req,res,next)=>{
    try{
        let user =await User.find() 
    if(user){
      return  res.status(200).send(objConverter.userResponce(user))
    }
    }catch(err){
   return res.status(500).send({message:"internal error occresd "})
    }

}
exports.findById=async (req,res)=>{
const userIdRequest = req.params.userId

const user = await User.find({
  userId:userIdRequest
})
if(user.length>0){
  return res.status(200).send(objConverter.userResponce(user))
}else{
  return res.status(200).send({message: `User with id ${userIdRequest} is not present`})
}

}
exports.update=async (req,res)=>{
    const userIdReq= req.params.userId
   
    try{
      const user=await User.findOneAndUpdate({

        userId:userIdReq
      },
      {
  userName:req.body.userName,
  userStatus:req.body.userStatus,
  userType:req.body.userType

}).exec();
if(user){
  return res.status(200).send({
    message:"User update successfuly"
  })
}
    }catch(err){
  res.status(500).send({message:"Some  internal error"})
}

    }


