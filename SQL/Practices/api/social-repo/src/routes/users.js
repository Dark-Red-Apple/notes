const express = require("express")
const UserRepo = require("../repos/user-repo")

// associate a lot of different routes with the router object here.
// we can export that router and associate it with the express application back in app.js
const router = express.Router()

// all users
router.get("/users", async (req, res) => {
  const users = await UserRepo.find()
  res.send(users)
})
// one user based on id
router.get("/users/:id", async (req, res) => {
  // get the parameters
  const { id } = req.params

  const user = await UserRepo.findById(id)
  // check if the user id exists
  if (user) res.send(user)
  else res.sendStatus(404)
})
// create a post
router.post("/users", async (req, res) => {
  const { username, bio } = req.body
  // the server will send us info, id created-at ... we send back to request
  const user = await UserRepo.insert(username, bio)

  res.send(user)
})
// update
router.put("/users/:id", async (req, res) => {
  // one is from url, one is from post method body
  const { id } = req.params
  const { username, bio } = req.body

  const user = await UserRepo.update(id, username, bio)
  // make sure we have found a user and id existed and updated
  if (user) {
    res.send(user)
  } else res.sendStatus(404)
})
// delete
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params
  const user = await UserRepo.delete(id)

  if (user) res.send(user)
  else res.sendStatus(404)
})

module.exports = router
