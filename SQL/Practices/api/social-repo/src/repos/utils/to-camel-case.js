//  this is to convert naming convention for column names
module.exports = (rows) => {
    // alter the naming convention
    return rows.map((row) => {
      const replaced = {}
      for (let key in row) {
        // finding either a dash or char following a single char. we get the character following too: (_a)
        const camelCase = key.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace("_", ""))
        // change the key (colum name) and set its value
        replaced[camelCase] = row[key]
      }
      return replaced
    })

}