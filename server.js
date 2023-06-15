const mongoose =require('mongoose')
const dbConfig=require("./configs/db.config")
const serverConfig = require("./configs/server.config")
const User = require("./models/user.model")
const bcrypt= require('bcryptjs')


//Express setting 


const bodyParser= require('body-parser')
const express= require('express')
const app=express() 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//Establish Db connection
mongoose.connect(dbConfig.DB_URL)
mongoose.connect("mongodb://localhost/crm_db")
const db =mongoose.connection
db.on("error" ,()=>{
    console.log("Error while connection to DB")

})
db.once("open",()=>{
    console.log("Connect to mongo DB")
    //create an admin if admin user doesn't excit
init()
})

async function init(){
    var user =await User.findOne({userId:"admin"});

    if(user){
        console.log("Admin User alredy present");
        return;
    }
    try{
    user= await User.create({
        name:"krishan jat",
        userId:"admin",
         email:"krishanchoudhary@gmail.com",
         userType:"ADMIN",
         userStatus:"APPROVED",
         password:bcrypt.hashSync("welcome",8)
    })
    console.log(user)
}
    
    catch(e){
        console.log("Error while creation admin user " + e);
    }
}

//import the routes

require("./routes/auth.routes")(app)
require('./routes/user.route')(app)
require("./routes/ticket.routes")(app)


// App(server) to listion for HTTP request at port 8080

app.listen(serverConfig.PORT,()=>{
    console.log("Application start on the port 8080 ")
}) 

