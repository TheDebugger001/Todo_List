
const express = require("express")
const router = express.Router()

const { registerUser, loginUser, Homepage } = require("../controllers/user.controllers")
const { UserAuth, UserValidation } = require("../middleware/user.middleware")

// * This is the post routes
router.post("/register", UserValidation, registerUser)
router.post("/login", UserValidation, loginUser)

router.get("/home", UserAuth, Homepage)