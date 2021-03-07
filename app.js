const http = require('http')
const requestHandler = require('./routes.js')

const server = http.createServer((req, res) => {
    requestHandler(req, res)
})

server.listen(3001)