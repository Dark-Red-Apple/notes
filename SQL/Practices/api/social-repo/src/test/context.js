// make an instance of a class that will serve as the context or a place we can write a lot of helpers

// to help with parallel testing
const { randomBytes } = require("crypto")
const { default: migrate } = require("node-pg-migrate")
const format = require("pg-format")
const pool = require("../pool")

const DEFAULT_OPTS = {
  host: "localhost",
  port: 5432,
  database: "socialnetwork-test",
  user: "postgres",
  password: "postgres",
}

class Context {
  static async build() {
    // this part added after we wanted isolation in tests and dbs. create schemas for dbs.
    // Randomly generating a role name to connect to PG as
    // a random name of num and letters. a is to make sure role name in postgres starts with a letter
    const roleName = "a" + randomBytes(4).toString("hex")
    // connect to PG as usual
    await pool.connect(DEFAULT_OPTS)
    // Create a new role
    // Single quote is really important.
    // We can not use second args to set the identifiers as values. use package pg-format
    //  I is the identifier and L is literal value
    await pool.query(format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName))
    // Create a schema with the same
    await pool.query(format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName))
    // Disconnect entirely from
    await pool.close()
    // Run our migrations in the new schema
    // set the log empty so we can read the test result easier
    // multiple different migration might cause error but noLock will tell don't lock the db, override it.
    await migrate({
      schema: roleName,
      direction: "up",
      log: () => {},
      noLock: true,
      dir: "migrations",
      databaseUrl: {
        host: "localhost",
        port: 5432,
        database: "socialnetwork-test",
        user: roleName,
        password: roleName,
      },
    })
    // Connect to PG as the newly created role
    // returns a promise that resolves after we successfully connect to db.
    // and running that initial select 1+1
    // since we return a promise the jest will wait before starting any tasks

    await pool.connect({
      host: "localhost",
      port: 5432,
      database: "socialnetwork-test",
      user: roleName,
      password: roleName,
    })

    return new Context(roleName)
  }

  constructor(roleName) {
    this.roleName = roleName
  }
  async reset() {
    return pool.query(`
    DELETE FROM users;
    `)
  }

  //   to clean up after ourselves. delete the roles and schemas
  async close() {
    // Disconnect from PG. to be able to delete the role.
    await pool.close()
    // Reconnect as our root user
    await pool.connect(DEFAULT_OPTS)
    // Delete the role and schema we created
    await pool.query(format("DROP SCHEMA %I CASCADE;", this.roleName))
    await pool.query(format("DROP ROLE %I;", this.roleName))
    // Disconnect
    await pool.close()
  }
}

module.exports = Context
