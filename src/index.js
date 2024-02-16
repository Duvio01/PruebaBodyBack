const server = require('./app')
const { conn } = require('./db_conection')
const PORT = 3002

server.listen(PORT, async()=>{
    await conn.sync({alter: true})
})