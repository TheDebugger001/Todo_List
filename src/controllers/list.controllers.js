
const List = require("../models/list.models")
const jwt = require("jsonwebtoken")

exports.createList = async(req, res) => {
  const { title, description } = req.body;

  const listToken = req.headers.authorization?.split(" ")[1]
  if (!listToken) return res.status(401).json({ message : "No token provided" })

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

  try{
    const newList = new List({
      title, 
      description
    })
    await newList.save()

    return res.status(201).json({
      message : "New List created successfully",
      List : newList
    })

  } catch (err) {
    res.status(501).json({ error: "Server error", err })
  }
}

// ! I stopped doing this because I haven't created the user yet, so, i WILL DOI
// exports.viewLists = async(req, res) => {
//   const token  = req.headers.authorization?.split(" ")[1]

//   let lists;

  
// }