 const constants= require("../utils/constant")
 const User= require("../models/user.model")
 const bcrypt=require("bcryptjs")
 const jwt=require("jsonwebtoken")
const authConfig = require("../configs/auth.config")

  exports.signup = async (req,res)=>{
var userStatus= req.body.userStatus
var userType= req.body.userType 
if(userType===constants.userTypes.customer){
userStatus=constants.userStatus.approved
}else{
    userStatus=constants.userStatus.pending
}
try{
    const createUser=await User.create({
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8),
        userType:req.body.userType,
        userStatus:userStatus,

    })
    const postResponce={
        name:createUser.name,
        userId:createUser.userId,
        email:createUser.email,
        userType:createUser.userType,
        userStatus:createUser.userStatus,
        createdAt:createUser.createdAt,
        updatedAt:createUser.updatedAt,
    }
    res.status(200).send(postResponce)
    
}catch(e){
 console.log("Error occrude is while check")
 res.status(500).send({
    message:"Some enreal error occured wwhile creating user"
 })
}
 }

 exports.signin =async (req,res)=>{
    const user = await User.findOne({userId:req.body.userId})
    if(!user){
        res.status(400).send({message:"Can't alow to login as"})
      return;

    }
    if(user.userStatus != constants.userStatus.approved){
        res.status(403).send({message:"Cant allow user to as the staus is  " + user.userStatus}
        )
        return;

    }

    //Checke password
    var isPassword=bcrypt.compareSync(req.body.password,user.password)
    if(!isPassword){
        return res.status(401).send({message:"passwor is invalid pls valid password" })
    }

    var token = jwt.sign({id:user.userId},authConfig.secretKey,{
        expiresIn:86400

    })
    res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        userStatus:user.userStatus,
        accessToken:token 

    })
    
 }