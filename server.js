const serverConfig=require('./Configs/server_configs')
const dbConfig=require('./Configs/db_configs')
const express=require("express")
const bodyParser=require('body-parser')
const mongoose=require("mongoose")
const app=express()

//middleware for converting js objects into json
app.use(bodyParser.json())
// app.use(bodyParser.urlendedCoded ({extended:true}))

//plugging routes to app
require('./Routes/user.routes')(app)
//connection to database
mongoose.connect(dbConfig.Db_URL)
const db=mongoose.connection;

db.on('error',()=>{
    console.log('error while connecting to db')
})
db.once('open',()=>{
    console.log('connected to database')
})

//connection to server
app.listen(serverConfig.PORT,()=>{
    console.log('server started on PORT:',serverConfig.PORT)
})
