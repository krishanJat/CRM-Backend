const authController= require ('../controller/auth.controller.js')
const {verfiySignup}= require('../middlewares')

module.exports = function(app){
  
    app.post("/crm/api/v1/auth/signup",[verfiySignup. validateSignUpRequest],authController.signup);
    app.post("/crm/api/v1/auth/signin",authController.signin);
}