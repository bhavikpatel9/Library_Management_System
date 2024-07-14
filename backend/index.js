const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

//database connections
mongoose.connect("mongodb+srv://patelbj229:a3JdEeQsAnVaKVNi@cluster0.ckeo1kh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const db = mongoose.connection

db.on("error",()=>{
    console.log("error while connecting to database");
})

db.once("open",()=>{
    console.log("successfully connected to database");
})

// routes
require("./routes/authRoutes")(app)
require("./routes/getUserRoutes")(app)
require("./routes/bookroutes")(app)

//server 
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is listing on port : ${PORT}`);
})