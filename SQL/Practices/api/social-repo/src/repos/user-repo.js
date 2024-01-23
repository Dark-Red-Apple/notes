const pool = require("../pool")
const toCamelCase = require("./utils/to-camel-case")

// option #1
// module.exports = {
//     find(){

//     },
//     findById(){

//     },
//     insert(){

//     }
// }

// option #2
// class UserRepo {
//     find(){

//     }

//     findByID(){

//     }

//     insert(){

//     }
// }

// module.export = new UserRepo()

// option #3 class static methods
class UserRepo {
  static async find() {
    // We need await to allow query to be executed.
    // result is not the actual array of rows, some other additional info
    // it has a rows property
    const { rows } = await pool.query("SELECT * FROM users;")

    return toCamelCase(rows)
  }

  static async findById(id) {
    // WARNING: Really big security issue
    // limit 1 is to make sure we only have one user
    // sql injection exploit.
    // const { rows } = await pool.query(`
    // SELECT * FROM users WHERE id = ${id} LIMIT 1;
    // `)

    const { rows } = await pool.query(` SELECT * FROM users WHERE id = $1;`, [id])

    // if empty returns undefined
    return toCamelCase(rows)[0]
  }

  static async insert(username, bio) {
    // We don't get info back by insert. RETURNING * will make sure that we do.
    const { rows } = await pool.query(`INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;`, [username, bio])

    return toCamelCase(rows)[0]
  }

  static async delete(id) {
    // the second parameter is called substitution or parameter array
    const { rows } = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *;", [id])
    return toCamelCase(rows)[0]
  }

  static async update(id, username, bio) {
    // Rows is an array
    const { rows } = await pool.query("UPDATE users SET username=$2, bio = $3 WHERE id = $1 RETURNING *;", [id, username, bio])
    return toCamelCase(rows)[0]
  }

  static async count() {
    const { rows } = await pool.query("SELECT COUNT(*) FROM users;")
    // what rows look like rows === [{count:29481}]
    return parseInt(rows[0].count)
  }
}

module.exports = UserRepo
