

const userAppRouteHandler = (req, res) => {

    const url = req.url
    const method = req.method
    const currentPathText = "Current path: " + url
    console.log(currentPathText)

    const users = []
    users.push({"username": "user1", "fruit": "apple"})
    users.push({"username": "user2", "fruit": "banana"})
    users.push({"username": "user3", "fruit": "berry"})
    console.log(users)

    if(url === "/"){
        res.write("<html><title>Welcome</title>")
        res.write("<body>")
        res.write("<h1>Welcome to the user mgmt app. Here are available paths</h1>")
        res.write("<ul><li>'/users - displays all users</li><li>'/create-user - supports user creation</li></ul>")
        res.write("<h2>Create a new user</h2>")
        res.write("<form action='/create-user' method='POST'><input type='text' name='username' value='username'/><input type='text' name='fruit' value='fruit'/><button type=submit>CREATE</button></form>")
        res.write("<body>")
        res.write("</html>")
        return res.end()
    }else if(url === '/users'){
        res.write("<html><title>Welcome</title>")
        res.write("<body>")
        res.write("<h1>Users</h1>")
        res.write("<ul>")
        for(let user in users){
            res.write("<li> username: " + user['username'] + " fruit: " + user['fruit'] + "</li>")
        }
        res.write("</ul>")
        res.write("<body>")
        res.write("</html>")
    }else if(url === "/create-user" && method === 'POST'){
        const allData = []
        req.on('data', (data) => {
            console.log(data)
            allData.push(data)
        })
        req.on('end', () => {
            const parsedData = Buffer.concat(allData).toString()
            console.log(parsedData)
            const splitValues = parsedData.split("&")
            console.log(splitValues)
            const dataToPush = []
            for(let values in splitValues){
                const userDetail = values.split("=")[1]
                console.log(userDetail)
                dataToPush.push(userDetail)
            }
            const userObject = {}
            userObject["username"] = dataToPush[0]
            userObject["fruit"] = dataToPush[1]
            console.log(userObject)
            users.push(userObject)
            res.setHeader('Location', '/user')
            res.write("<h2>New user of data: " + parsedData + " has been added </h2>")
            return res.end()
        })
    }else{
        console.log("Path >>" + url + "<< not detected")
    }
    console.log("Request hit at " + Date.now())
}

module.exports = userAppRouteHandler;