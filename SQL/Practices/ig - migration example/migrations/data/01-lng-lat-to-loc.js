// 01 in name is just to provide an index. the order it should be executed
// the pg migration tool just looks in migration folder directly anything in data folder is considered data migration

const pg = require("pg")

// create a conn to pg server
const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "socialnetwork",
  user: "postgres",
  password: "postgres",
})

pool
  .query(
    `
  UPDATE posts
  SET loc = POINT(lng,lat)
  WHERE loc IS NULL;
`
  )
  .then(() => {
    console.log("Update complete")
    pool.end()
  })
  .catch((err) => console.error(err.message))
