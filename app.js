const http = require('http')

function reqListener (req, res){

} 

const server = http.createServer((req, res) => {
    console.log("\n\nThis is a request\n\n")
    console.log(req)
    console.log("\n\nThis is a response\n\n")
    console.log(res)
})

server.listen(3001)