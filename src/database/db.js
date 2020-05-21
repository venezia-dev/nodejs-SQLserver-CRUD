const sql = require('mssql')

// Config DB SQL SERVER 2012 LOCAL - Configuracion con SQL SERVER 2012 LOCAL
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

