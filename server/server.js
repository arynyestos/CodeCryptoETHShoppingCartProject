const ex = require('express')
const mysqlDB = require('./db')
const cors = require('cors')

const server = ex()
server.use(cors())

server.get("/", (req, res) => {
    res.send({ "Ve a productos": "Nada que ver aquí" })
})

server.get("/ping", (req, res) => {
    res.send({ "pong": new Date() })
})

server.get("/productos", async (req, res) => {
    try {
        const [results, fields] = await mysqlDB.consulta("SELECT * FROM Products")
        res.send(results)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

server.get("/productos/:idProducto", async (req, res) => {
    try {
        const [results, fields] = await mysqlDB.consulta("SELECT * FROM Products where ProductID = ?", [req.params.idProducto])
        res.send(results)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

server.listen(7777, () => {
    console.log("Servidor iniciado")
})