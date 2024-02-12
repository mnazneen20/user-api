// Dependencies
const db = require('../lib/dataOperations');
const tojson = require('../utils/tojson');
const hashing = require('../utils/hashing')

const userMethods = {}

// handling get request
userMethods.GET = (requestObj, callback) => {
    if (!requestObj.query) {
        callback(404, {
            message: 'Invalid Requested',
        });
    } else {
        const query = requestObj.query.split('=');
        if (query[0] === 'username') {
            const username = typeof query[1] === 'string' && query[1].trim().toLowerCase().length > 0 ? query[1] : null;
            if (username) {
                db.operations.read('users', username, (data) => {
                    if (data) {
                        // parsing the data into json object and removing password for security.
                        const userInfo = tojson(data);
                        delete userInfo.password;

                        callback(200, {
                            message: 'User found',
                            user: userInfo
                        })
                    } else {
                        callback(404, {
                            message: 'Requested user not found',
                        })
                    }
                })
            } else {
                callback(404, {
                    message: 'Requested user not found',
                })
            }
        } else {
            callback(404, {
                message: 'Invalid Requested',
            })
        }
    }
}

// handling post request
userMethods.POST = (requestObj, callback) => {
    //getting firstname, lastname, password, username**
    const firstname = typeof requestObj.body.firstname === 'string' && requestObj.body.firstname.trim().length > 0 ? requestObj.body.firstname : null;

    const lastname = typeof requestObj.body.lastname === 'string' && requestObj.body.lastname.trim().length > 0 ? requestObj.body.lastname : null;

    const password = typeof requestObj.body.password === 'string' && requestObj.body.password.trim().length > 0 ? requestObj.body.password : null;

    const username = typeof requestObj.body.username === 'string' && requestObj.body.username.trim().toLowerCase().length > 0 ? requestObj.body.username.toLowerCase() : null;

    // adding the user
    if (firstname && lastname && password && username) {
        //first checking if user already exists
        db.operations.read('users', username, (fileExists) => {
            if (!fileExists) {
                db.operations.create('users', username, {
                    firstname,
                    lastname,
                    password: hashing(password),
                    username,
                }, (filecreated) => {
                    if (filecreated) {
                        callback(201, {
                            message: 'New User Created'
                        })
                    } else {
                        callback(500, {
                            message: 'Something went wrong'
                        })
                    }
                })
            } else {
                callback(400, {
                    message: 'Please provide valid data'
                })
            }
        })
    } else {
        callback(400, {
            message: 'Please provide valid data'
        })
    }
}

// handling update request
userMethods.PUT = (requestObj, callback) => {
    if (!requestObj.query) {
        callback(404, {
            message: 'Invalid Requested',
        });
    } else {
        const query = requestObj.query.split('=');
        if (query[0] === 'username') {
            const username = typeof query[1] === 'string' && query[1].trim().toLowerCase().length > 0 ? query[1] : null;

            if (username) {
                const firstname = typeof requestObj.body.firstname === 'string' && requestObj.body.firstname.trim().length > 0 ? requestObj.body.firstname : null;

                const lastname = typeof requestObj.body.lastname === 'string' && requestObj.body.lastname.trim().length > 0 ? requestObj.body.lastname : null;

                const password = typeof requestObj.body.password === 'string' && requestObj.body.password.trim().length > 0 ? requestObj.body.password : null;
                if (firstname || lastname || password) {
                    db.operations.read('users', username, (fileData) => {
                        if (fileData) {
                            const updatedData = { ...tojson(fileData) }
                            if (firstname) {
                                updatedData.firstname = firstname;
                            }
                            if (lastname) {
                                updatedData.lastname = lastname;
                            }
                            if (password) {
                                updatedData.password = hashing(password);
                            }
                            db.operations.update('users', username, updatedData, (operation) => {
                                if (operation) {
                                    callback(200, {
                                        message: 'User updated'
                                    })
                                } else {
                                    callback(500, {
                                        message: 'Something went wrong'
                                    })
                                }
                            })
                        } else {
                            callback(404, {
                                message: 'User not found'
                            })
                        }
                    })
                } else {
                    callback(400, {
                        message: 'Provide valid data'
                    })
                }
            } else {
                callback(404, {
                    message: 'User not found'
                })
            }
        } else {
            callback(404, {
                message: 'Invalid request'
            })
        }
    }
}

// handling delete request
userMethods.DELETE = (requestObj, callback) => {
    const query = requestObj.query.split('=');
    if (query[0] === 'username') {
        const username = typeof query[1] === 'string' && query[1].trim().toLowerCase().length > 0 ? query[1] : null;
        if (username) {
            db.operations.read('users', username, (data) => {
                if (data) {
                    db.operations.delete('users', username, (isDeleted) => {
                        if (isDeleted) {
                            callback(203, {
                                message: 'User Deleted',
                            })
                        } else {
                            callback(500, {
                                message: 'Something went wrong',
                            })
                        }
                    })
                } else {
                    callback(404, {
                        message: 'Requested user not found',
                    })
                }
            })
        } else {
            callback(404, {
                message: 'Invalid Request',
            })
        }
    } else {
        callback(404, {
            message: 'Invalid Requested',
        })
    }
}

module.exports = userMethods;