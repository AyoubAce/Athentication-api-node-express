const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findById } = require("../models/models");
const User = require("../models/models");

//generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20min",
  });
};
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5d",
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.cookie("jwt", generateRefreshToken(user._id), {
        httpOnly: true,
        maxAge: 48 * 60 * 60 * 1000,
      });
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "invalid email or password" });
    }
  } catch (error) {
    console.log("not found", error);
  }
};
// register new USER
const newAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "please fill all fields" });
    }
    //check if user exist already
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({
          message: "This is email address is already used",
          email: email,
        });
    }
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "invalid data" });
    }
  } catch (error) {
    console.log("err occured in userController ", error);
  }
};
//change password / name
const updateAccount = async (req, res) => {
  const { password, newPassword, name } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    // change password when requested
    if(password && newPassword){
          const verifiedUser = await bcrypt.compare(password, user.password);
     if (verifiedUser) {
      //encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json({ _id:user.id, name:user.name});
      }
     } else {
      res.status(400).json({ message: "Wrong password!" });
    }
    }

    //change user name when requested
    else if(name){
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{name:name}, {new:true})
        if(updatedUser){
            res.status(200).json({_id:user.id, name:updatedUser.name})
        }
    }
  
    
  } catch (error) {
    console.log("err occured in updateUser", error);
  }
};
const deleteAccount = async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if(!user){
          res.status(400).json({message: "user not found!"})
      }
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({ id: req.params.id });
  } catch (error) {
      console.log("deleteUser err", error);
  }
};



module.exports = {
  userLogin,
  newAccount,
  updateAccount,
  deleteAccount,
};
