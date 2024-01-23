const pg = require("pg")

// Normally, we would create a pool like this;
// provide the conn obj to how to connect to db
// for testing we don't use this.
// this method make it hard to connect to multiple different dbs.
// const pool = new pg.Poll({
//     host: 'localhost',
//     port: 5432
// })

// module.exports = pool

// test setup
// wrap up a pool
// so we can tell our pool to connect to a different db at some point of time.
// making a class and flexible method to set different db conns that we want
class Pool {
  // an instance of class will have a var named _pool
  _pool = null

  // one single method connect
  connect(options) {
    // create the nes actual pool to set the conn object
    // and assign it to the class prop
    this._pool = new pg.Pool(options)
    // test the conn to db. if we have valid conn. force the pool to connect to db, since by default it does not. write a query
    // this is a common method actually
    // what is returned is a promise. will be resolved if the query is executed successfully.
    return this._pool.query("SELECT 1 + 1;")
  }

  // disconnect to db entirely
  close() {
    return this._pool.end()
  }

  // primary method to run a query. sending a sql to db.
  // reallyConst {rows} = await pool.query(` SELECT * FROM users WEHRE id = $1;`, [id]) big security issue here!!
  // two values to address sql injection exploit to use prepare
  query(sql, params) {
    return this._pool.query(sql, params)
  }
}

module.exports = new Pool()
