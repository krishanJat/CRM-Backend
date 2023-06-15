const {authjwt,verfiySignup}=require("../middlewares")
const userController= require("../controller/user.controller")


module.exports= function (app){
    app.get("/crm/api/v1/users/",[authjwt.verfiyToken,authjwt.isAdmin],userController.findAll);
    app.get("/crm/api/v1/users/:userId",[authjwt.verfiyToken,authjwt.isAdmin],userController.findById);
    app.put("/crm/api/v1/users/:userId",[authjwt.verfiyToken,authjwt.isAdmin],userController.update);
}
