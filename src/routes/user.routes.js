
const express = require("express")
const router = express.Router()

const {
  registerUser
 } = require("../controllers/user.controllers")

// * This is the post routes
router.post("/register", registerUser)
router.post("/login", loginUser)