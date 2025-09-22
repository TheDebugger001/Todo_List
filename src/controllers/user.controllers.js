const User = require("../models/user.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.registerUser = async(req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing_user = await User.findOne({ email })
    if(existing_user) return res.status(409).json({ message: "User already exists ( This email is used )"})

    const hashedPassword = await bcrypt.hash(password, 10)

    const generateToken = (UserId) => {
      return jwt.sign(
        { id: UserId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
        )
    }
    const userToken = generateToken(User._id)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    await newUser.save()

    res.status(201).json({ 
      message: "User was created successfully",
      userToken,
      User : {
        id: User._id,
        email: User.email,
        username: User.username,
        password: User.hashedPassword
      }
  })

  } catch (error) {
    return res.status(501).json({ message: "Server error", error })
  }
}



exports.loginUser = async(req, res) => {
  const { username, email, password } = req.body;

  try {
    const User = await User.findOne({ email })
    if(!User) return res.status(404).json({ message: "User is not registered" })

    const isMatch = bcrypt.compare(password, User.password)
    if(!isMatch) return res.status(401).json({ message: "Invalid credentials" })

    const isUsername = await User.findOne({ username })
    if(!isUsername) return res.status(401).json({ message: "Invalid Username"})

    const loginToken = jwt.sign(
      { id: User._id,
        email: User.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h"}
    )

    return res.status(201).json({
        message: "Logged in Successfully",
        token: loginToken,
        User: {
          id: User._id,
          username: User.username,
          email: User.email,
          password: User.password
        }
      })
      
  } catch (error) {
    res.status(501).json({ message: "Server error", error })
  }
}

exports.Homepage = async (req, res) => {
  res.send("Hiiii bro, you are in the homepage now")
}