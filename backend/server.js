const express= require("express")
const cors= require("cors")
require("dotenv").config()

const connectDB= require('./configdb/mongodb')
const userRouter= require('./routes/userRoutes')

const port = process.env.PORT || 5000
connectDB();
const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/",userRouter)

app.listen(port, ()=>{
    console.log("Server connected on port:",port);
})