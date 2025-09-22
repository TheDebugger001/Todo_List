const mongoose = require("mongoose")
const express = require("express")
const dotenv = require("dotenv")

dotenv.config()
const PORT = process.env.PORT
const MONGO = process.env.MONGO_CS
const app = express()
const UserRoutes = require("./src/routes/user.routes")


mongoose.connect(MONGO)
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log("Failed to connect", err))

app.use("/api/user", UserRoutes)

app.get("/", (req, res) => {
  res.status(201).json({ message: "Hii, the app is good"})
})

app.listen((PORT), console.log(`Server running at http://localhost:${PORT}`))