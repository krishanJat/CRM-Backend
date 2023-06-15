const mongoose = require("mongoose")

const TicketSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    ticketPriority:{
        type:String,
        required:true,
        default:4
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"OPEN",
    },
    reporter :{
    type:String
    },
    assignee:{
        type:String
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
         updatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }

    }

})

module.exports=mongoose.model("ticket",TicketSchema)