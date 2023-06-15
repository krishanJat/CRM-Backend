const constants = require("../utils/constant")


validateTicketRequest =( req,res,next)=>{
//validate ticket of the ticket
if(!req.body.title){
    res.status(400).send({message:"Title is not provided"})

}
//validate descripction  ticket
if(!req.body.description){
    res.status(400).send({message: "Description is not providedc"})
}
next()
}

validateTicketStatus = (req,res,next)=>{
     const status = req.body.status;
     const statusTypes = [constants.ticketStatus.open,constants.ticketStatus.closed,constants.ticketStatus.blocked,constants.ticketStatus.inprogress]

     if(status && !statusTypes.includes(status)){
     return res.status(400).send({message:"Faild! status type is invalid"})
     }
next()

}




const verifyTicketRequestBody={
    validateTicketRequest:validateTicketRequest,
    validateTicketStatus:validateTicketStatus
}
module.exports = verifyTicketRequestBody