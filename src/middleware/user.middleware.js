
const jwt = require("jsonwebtoken")
const { body, validationResult, header } = require("express-validator")

const UserValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username must not be empty"),

  body("email")
    .notEmpty()
    .withMessage("Email must not be empty"),

  body("password")
    .notEmpty()
    .withMessage("The password must not be empty")
    .isLength({ min: 5 })
    .withMessage("The password must not at least have 5 characters")

]


const UserAuth = async (req, res, next) => {

  try {

    const authHeader = req.headers["authorization"];
    const headerToken = authHeader && authHeader.split(" ")[1];

    if (!headerToken) return res.status(401).json({ message: "No Token provided"})

    const decode = jwt.verify(headerToken, process.env.JWT_SECRET_KEY)

    req.user = decode
    next()

  }catch (error) {
    return res.status(401).json({ message: "Unauthorized user"})
  }
  
}

module.exports = {
  UserValidation,
  UserAuth
}