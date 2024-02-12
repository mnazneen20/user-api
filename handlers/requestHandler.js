// dependencies
const { StringDecoder } = require('node:string_decoder')
const url = require('url')
const routes = require('../routes/allRouteHandler')
const tojson = require('../utils/tojson')

// handles the routes according to user request:
requestHandler = (request, response) => {
    // extracting all request related data
    const myURL = url.parse(request.url)
    const path = myURL.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = request.method.toUpperCase();
    const query = myURL.query;
    const headers = request.headers;

    // necessary request properties bundle
    const requestProps = {
        myURL,
        path,
        trimmedPath,
        method,
        query,
        headers
    }

    // receiving full request data
    const decoder = new StringDecoder;
    let data = '';

    request.on('data', (buffer) => {
        data += decoder.write(buffer);
    })
    request.on('end', () => {
        data += decoder.end();
        requestProps.body = tojson(data);
        // find the handler function and calling it.
        const handleRequest = routes[trimmedPath] || routes.error;

        handleRequest(requestProps, (statusCode, mesaage) => {
            // consverting the response into string
            const serverResponse = JSON.stringify(mesaage);

            // finally sending the response
            response.setHeader('Content-Type', 'application/json');
            response.writeHead(statusCode);
            response.end(serverResponse);
        })
    })
}

module.exports = requestHandler;