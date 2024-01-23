// require is a synchronous operation and will block the execution of
// the script until the module is loaded and ready to be used. import ,
//  on the other hand, is an asynchronous operation, so the script will
// not be blocked while the module is loading.
const express = require("express")
const pg = require("pg")

// create a conn to pg server
const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "socialnetwork",
  user: "postgres",
  password: "postgres",
})
// test the conn
// pool.query("SELECT 1 + 1;").then((res) => console.log(res))

// create an express app
const app = express()
// wire up a middleware to  use with the express application
// that is going to allow us to receive form submission from the browser
app.use(express.urlencoded({ extended: true }))

// two handlers. one to show all posts
// one to allow the user to create a post
app.get("/posts", async (req, res) => {
  const { rows } = await pool.query(`
        SELECT * FROM posts;
    `)
  res.send(`
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>lng</th>
                    <th>lat</th>
                </tr>
            </thead>
            <tbody>
                ${rows
                  .map((row) => {
                    return `
                        <tr>
                            <td>${row.id}</td>
                            <!--
                            <td>${row.lng}</td>
                            <td>${row.lat}</td> -->
                            <!-- this is step num #4 -->
                            <td>${row.loc.x}</td>
                            <td>${row.loc.y}</td>
                        </tr>
                    `
                  })
                  .join("")}
            </tbody>
        </table>

        <form method="POST">
            <h3>Create Post</h3>
                <div>
                    <label>lng</label>
                    <input name = "lng" />
                </div>
                <div>
                    <label>lat</label>
                    <input name = "lat" />
                </div>
                <button type="submit">Create</button>
        </form>
    `)
})

app.post("/posts", async (req, res) => {
  // we don't need to change how we receive the data in step #4
  const { lng, lat } = req.body

  // create and save a new post to db
  //   await pool.query("INSERT INTO posts (lat, lng) VALUES ($1,$2);", [lat, lng])

  //   change the api after the first step
  await pool.query("INSERT INTO posts (lat, lng, loc) VALUES ($1,$2,$3);", [lat, lng, `(${lng},${lat})`])

  //   step num four change the reference to the new colum loc
  await pool.query("INSERT INTO posts (loc) VALUES ($1);", [`(${lng},${lat})`])

  res.redirect("/posts")
})

// tell the app to listen to a port. Check the localhost:3005/posts to see the app
app.listen(3005, () => {
  console.log("Listening on port 3005")
})
