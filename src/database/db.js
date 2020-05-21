const sql = require('mssql')

const config = {
    database: '...',
    authentication: { type: 'default', options: { userName: '...', password: '...' } },
    server: 'XXX\\SQLEXPRESS',
    options: {
        instanceName: 'SQLEXPRESS',
        encrypt: false
    }
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL SERVER')
    return pool
  })
  .catch(err => console.log('Database error, mal Config: ', err))

module.exports = {
  sql, poolPromise
}

