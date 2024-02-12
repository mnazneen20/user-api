// A server to handle User api
// API endpoints:
// 1. Create user:POST at '/user'
// 2. Get user: GET at '/user?username=name'
// 3. Update user: PUT at '/user?username=name'
// 4. Delete user: DELETE at '/user?username=name'


// Dependencies: 
const http = require('http');
const requestHandler = require('./handlers/requestHandler')


// main object
const app = {};


// configurations:
app.configurations = {
    port: 4000,
}

app.requestHandler = requestHandler;

//creating the server
app.myServer = () => {
    const server = http.createServer(requestHandler);
    server.listen(process.env.NODE_PORT || app.configurations.port, () => {
        console.log('Server started at port:', process.env.NODE_PORT || app.configurations.port)
    })
}

// starting the server
app.myServer();