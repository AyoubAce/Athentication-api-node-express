const express= require("express")
const cors= require("cors")
require("dotenv").config()
const connectDB= require('./configdb/mongodb')

const port = process.env.PORT || 5000
connectDB();
const app= express()
app.use(cors())


app.listen(port, ()=>{
    console.log("Server connected on port:",port);
})