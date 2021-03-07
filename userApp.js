const http = require('http')
const userAppRouteHandler = require('./userAppRoutes.js')

const port = 3022
const server = http.createServer((req, res) => {
    userAppRouteHandler(req, res)
})

server.listen(port, () => {
    console.log("Running the app on " + port)
})