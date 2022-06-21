const express= require("express")
const {userLogin, newAccount, updateAccount,deleteAccount}= require("../controllers/userController")
const router= express.Router()

router.get("/user",userLogin)
router.post("/user",newAccount)
router.post("/user",updateAccount)
router.post("/user",deleteAccount)

module.exports= router;
