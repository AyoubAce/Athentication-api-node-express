const express= require("express")
const {userLogin, newAccount, updateAccount,deleteAccount}= require("../controllers/userController")
const router= express.Router()
const verifyToken= require('../middleware/verifyToken')

router.get("/user",userLogin)
router.post("/user",newAccount)
router.put("/user",updateAccount)
router.delete("/user",deleteAccount)

module.exports= router;
