const User = require("../models/user.model")
const Ticket= require("../models/ticket.model")
const constants = require("../utils/constant")
const sendEmail= require("../utils/notifactionClientSent")

exports.createTicket = async(req,res) =>{
 const ticketObject= {
    title:req.body.title,
    ticketPriority:req.body.ticketPriority,
    description:req.body.description,
     status:req.body.status,
     reporter:req.userId
 }
 const engineer= await User.findOne({
    userType:constants.userTypes.engineer, 
    userStatus:constants.userStatus.approved
 })
 ticketObject.assignee= engineer.userId
 
 try{
    const ticket= await Ticket.create(ticketObject)
    if(ticket){
        const user = await User.findOne({
            userId:req.userId
        
        }) 
        console.log(ticket)
        user.ticketsCreated.push(ticket._id);
        await user.save()
        // update the manager

        if(engineer){
            engineer.ticketsAssigned.push(ticket._id);
           await engineer.save()
        }
            
// send mail request
           
       sendEmail(ticket._id,`Ticket with ticketid ${ticket._id} updated and is in status  ${ticket.status}`,ticket.description,[user.email,engineer.email],ticket.reporter);

       return res.status(200).send(ticket)
    }

 }catch(err){
     res.status(500).send({
        message:"internal error ocures"
    })
 }


}

exports.updateTicket= async(req,res)=>{
const ticket= await Ticket.findOne({_id:req.params.id})
 



if(ticket && ticket.reporter===req.userId){
    ticket.title=req.body.title!=undefined? req.body.title:ticket.title,
ticket.description= req.body.description!=undefined? req.body.description : ticket.description,
ticket.ticketPriority=req.body.ticketPriority!= undefined? req.body.ticketPriority:ticket.ticketPriority,
ticket.status=req.body.status!=undefined? req.body.status :ticket.status

 var updatTicket= await ticket.save()
 

 return res.status(200).send(updatTicket)
 
}
else{
   return res.status(403).send({message:"ticket update by only customer"})
}
}

exports.getAllTicket = async(req,res)=>{
const quaryObject={
    reporter:req.userId

}
if(req.query.status != undefined){
quaryObject.status=req.query.status
quaryObject.ticketPriority=req.query.ticketPriority
}
const tickets= await Ticket.find(quaryObject);
if(tickets){
    return res.status(400).send(tickets)
}
}
exports.getOneTicket = async(req,res)=>{
const ticket=await Ticket.findOne({
    _id:req.params.id,
    reporter:req.userId

})
if(ticket){
    return res.status(200).send(ticket)
}

}
