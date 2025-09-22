
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")

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


//  TODO: I'll have to finish authentication of the users this day, on 22/ September /2025
// ! FIXME: This mission has failed now so


module.exports = {
  UserValidation
}