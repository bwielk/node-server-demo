const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Start page</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">SEND</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunkOfData) => {
            console.log(chunkOfData)
            body.push(chunkOfData)
        }) //switches listening to events on
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            fs.writeFile('message.txt', parsedBody, err => {
                //exception handling
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    } 
}

module.exports = requestHandler
