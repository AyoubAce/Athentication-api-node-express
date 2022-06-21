const mongoose= require("mongoose")

const connectDB= async ()=>{
    try {
        const connection= await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
        console.log("Database connected:",connection.connection.host);
    } catch (error) {
        console.log("database connection FAILED! Error:",error);
        //terminate process when unhandled fatal exceptions occurs 
        process.exit(1)
    }
}

module.exports= connectDB