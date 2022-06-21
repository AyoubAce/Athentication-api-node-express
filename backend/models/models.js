const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please add your name"]
    },
    email:{
        type: String,
        required:[true, "Please add your email"],
        unique:true
    },
    password: {
        type: String,
        required:[true, "Please add a password"],

    },
},{
    timestamps:true
}
)
const User= mongoose.model("user", userSchema)

module.exports= User