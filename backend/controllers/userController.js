const bcrypt= require("bcryptjs")
const jwt = require('jsonwebtoken')
const {User}= require("../models/models")

//generate Token
const generateToken= (id)=>{
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"20min"})
}
const generateRefreshToken= (id)=>{
    return jwt.sign({id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"5d"})
}

const userLogin= async ()=>{

}
// register new USER
const newAccount= async(req,res)=>{
    try {
        const {name, email, password}= req.body
        if(!name || !email || !password){
            res.status(400).json({message:'please fill all fields'})
        }
        //check if user exist already
        const existingUser= await User.findOne({email})
        if(existingUser){
            res.status(400).json({message:"This is email address is already used", email: email})
        }
        //encrypt password
        let salt= await bcrypt.genSalt(10)
        let hashedPassword= await bcrypt.hash(password,salt)

        //create user
        const user= await User.create({
            name,
            email,
            password:hashedPassword,
        })
        if(user){
            res.cookie("jwt", refreshToken, {httpOnly:true, maxAge: 23*60*60*1000})
            res.status(201).json({
                _id:user.id,
                name: user.name,
                email:user.email,
                token: generateToken(user._id),
            })
        }

        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}
const updateAccount = async()=>{

}
const deleteAccount = async()=>{

}

module.exports= {userLogin, newAccount, updateAccount, deleteAccount}