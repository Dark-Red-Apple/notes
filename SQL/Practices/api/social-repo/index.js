const app = require("./src/app.js")
const pool = require("./src/pool.js")

// connect the the pool to local db
// do this first
// when we first create a pool no contact with postgres is made
pool
  .connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork",
    user: "postgres",
    password: "postgres",
  })
  //   if you want to use a separate function you need async await
  .then(() => {
    app().listen(3005, () => {
      console.log("Listening on port 3005")
    })
  })
  .catch((err) => {
    console.error(err)
  })

// tell the app to start listening to some port
// when we first create a pool no contact with postgres is made
// app().listen(3005, () =>{
//     console.log('Listening on port 3005')
// })
