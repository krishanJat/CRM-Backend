 const User =require("../models/user.model")
const constants = require("../utils/constant")

validateSignUpRequest = async (req,res,next)=>{
//implement logic for validting the request

//1. validate the name
if(!req.body.name){
    res.status(400).send({message:"Faild! name is not provided"})
    return;

}
//2.validate the userId
if(!req.body.userId){
    res.status(400).send({message:"Faild! userId is not provided"})
    return;
}
//3.validate if the userId alredy exisit
const user = await User.findOne({userId:req.body.userId});
if(user !=null){
    res.status(400).send({
        message:"Faild! user alredy exccit"
    })
    return;
}
//4.validate email


//5.email is alredy exccit
const email= await User.findOne({email:req.body.email})
if(email !=null){
     res.status(400).send({
        message:"Faild! email alredy exccit"
    })
    return
}
//6. validate the userType
const userType= req.body.userType;
  const validUserTypes =[constants.userTypes.customer,constants.userTypes.engineer,constants.userTypes.admin]
if(userType && !validUserTypes.includes(userType)){
res.status(400).send({message:"userType provided is invlide"
})
return;
}
next();
}



const verfiySignup={
 validateSignUpRequest:validateSignUpRequest
}

module.exports = verfiySignup  