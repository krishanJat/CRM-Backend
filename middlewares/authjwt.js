const jwt= require("jsonwebtoken")
const config=require("../configs/auth.config")
const User=require("../models/user.model")
const constant=require("../utils/constant")

verfiyToken=(req,res,next)=>{
let token= req.headers["x-access-token"];  
if(!token){
    return res.status(403).send({message:"Notoken has been provided"})
}
jwt.verify(token,config.secretKey,(err,decoded)=>{
    if(err){
        return res.status(403).send({message:"This token is not autherized"})
    }
    
       req.userId=decoded.id
      
       next();
})

}


isAdmin= async(req,res,next)=>{
    const user= await User.findOne({
        userId:req.userId
    })
if(user && user.userType===constant.userTypes.admin) {
    next()
}
else{ return res.status(403).send({
    message:"Only allowd admin"
})
}

}

const authjwt={
    verfiyToken:verfiyToken,
    isAdmin:isAdmin
}

module.exports=authjwt;