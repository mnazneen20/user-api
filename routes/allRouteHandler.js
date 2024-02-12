// Dependencies
const userMethods = require('./userHandler')

const routes = {};

//handling user route
const userHandler = (requestObj, callback) => {

    // list of allowed methods for user route
    const allowedRoutes = ['GET', 'POST', 'PUT', 'DELETE'];
    const reqMethod = requestObj.method;

    if (allowedRoutes.includes(reqMethod)) {
        // finding requested user method
        const userhandler = userMethods[reqMethod];
        userhandler(requestObj, callback);
    } else {
        callback(405, {
            message: 'Not allowed'
        })
    }
}

// handling not found route
const notFoundHandler = (_, callback) => {
    callback(404, {
        message: 'Request not found'
    })
}

// specifying the routes
routes.user = userHandler;
routes.error = notFoundHandler

module.exports = routes;