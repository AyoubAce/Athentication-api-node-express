const jwt= require("jsonwebtoken");
const User = require("../models/models");
require('dotenv').config()

const verifyToken= async (req,res,next)=>{
    let token;
    const authHeader= req.headers.authorization
    console.log(authHeader);
    try {
        if(authHeader && authHeader.startsWith("Bearer")){
            //"Bearer token"
            token= authHeader.split(' ')[1]
            const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            req.user= await User.findById(decodedToken.id).select("-password")
            next()
        } 
    } catch (error) {
        console.log("auth error",error);
        res.status(401).json({message:"Unauthorized", error,})
    }
    if(!token){
        res.status(401).json({message:"Not authorized: No token found"})
    }
}

module.exports= verifyToken