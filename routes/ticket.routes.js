const {authjwt,verifyTicketRequestBody} 
=require("../middlewares")
const ticketController= require("../controller/ticketController")
module.exports = function (app){
     
    app.post("/crm/api/v1/tickets/",[authjwt.verfiyToken,verifyTicketRequestBody.validateTicketRequest],ticketController.createTicket);
   app.put("/crm/api/v1/tickets/:id",[authjwt.verfiyToken,verifyTicketRequestBody.validateTicketStatus],ticketController.updateTicket);
   
   app.get("/crm/api/v1/tickets/",[authjwt.verfiyToken],ticketController.getAllTicket)
   app.get("/crm/api/v1/tickets/:id",[authjwt.verfiyToken],ticketController.getOneTicket)
}