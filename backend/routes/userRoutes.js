const express = require("express");
const {
  userLogin,
  newAccount,
  updateAccount,
  deleteAccount,
  changePassword,
} = require("../controllers/userController");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router
  .post("/login", userLogin)
  .post("/register", newAccount)
  .put("/user/:id",verifyToken, updateAccount)
  .delete("/user/:id",verifyToken, deleteAccount);

module.exports = router;
