const http = require('http')
const fs = require('fs')

function reqListener (req, res){

} 

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>Start page</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">SEND</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if(url === '/message' && method === 'POST'){
        const body = []
        req.on('data', (chunkOfData) => {
            console.log(chunkOfData)
            body.push(chunkOfData)
        }) //switches listening to events on
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
        fs.writeFileSync('message.txt', parsedBody)

        })
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }
    console.log("\n\nThis is a request\n\n")
    console.log("\n\nURL\n\n")
    console.log(req.url)
    console.log("\n\nHeaders\n\n")
    console.log(req.headers)
    console.log("\n\nMethod\n\n")
    console.log(req.method)
    console.log("\n\nThis is a response\n\n")
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Blaise\'s server</title></head>')
    res.write('<body><h1>Hello! It is your server speaking!</h1></body>')
    res.write('</html>')
    res.end()
    console.log(res)
})

server.listen(3001)