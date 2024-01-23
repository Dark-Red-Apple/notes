const express = require("express")
const usersRouter = require("./routes/users")

// module.exports is an object in a Node.js file that holds the exported values and functions from that module.
// Declaring a module.exports object in a file specifies the values to be exported from that file. When exported, another module can import this values with the require global method.
module.exports = () => {
  // create an express app and return it
  const app = express()

  // The app. use() method mounts or puts the specified middleware functions at the specified path.
  // This middleware function will be executed only when the base of the requested path matches the
  // defined path.
  // wire up a single middleware to parse any incoming json
  app.use(express.json())
  // associate the router with the express app
  app.use(usersRouter)

  return app
}

// we don't have the app.listen() at the bottom as usual for testing strategy
