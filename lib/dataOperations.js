//dependencies
const path = require('path');
const fs = require('fs');

// initiating database
const db = {}
db.baseDirectory = path.join(__dirname, '../database/');

// defining database operations (CRUD)
db.operations = {};

// operation for creating a data instance..
db.operations.create = (directoryName, fileName, data, callback) => {
    //open file for writing..
    fs.open(db.baseDirectory + directoryName + '/' + fileName + '.json', 'wx', (error1, fileDescriptor) => {
        if (!error1 && fileDescriptor) {
            // reading the file 
            const dataString = JSON.stringify(data);
            //writing over the file
            fs.writeFile(fileDescriptor, dataString, (error2) => {
                if (!error2) {
                    fs.close(fileDescriptor, (error3) => {
                        if (!error3) {
                            callback(true)
                        } else {
                            callback(false);
                        }
                    })
                } else {
                    callback(false);
                }
            })
        } else {
            callback(false);
        }
    })
}

// operation for reading a data instance..
db.operations.read = (directoryName, fileName, callback) => {
    fs.readFile(db.baseDirectory + directoryName + '/' + fileName + '.json', 'utf8', (error, data) => {
        if (!error) {
            callback(data);
        } else {
            callback(false)
        }
    })
}

// operation for updating a data instance..
db.operations.update = (directoryName, fileName, data, callback) => {
    fs.open(db.baseDirectory + directoryName + '/' + fileName + '.json', 'r+', (error1, fileDescriptor) => {
        if (!error1 && fileDescriptor) {
            // clearing existing data
            fs.ftruncate(fileDescriptor, (error2) => {
                if (!error2) {
                    // converting data string.
                    const dataString = JSON.stringify(data);
                    //writing on the file
                    fs.writeFile(fileDescriptor, dataString, (error3) => {
                        if (!error3) {
                            fs.close(fileDescriptor, (error4) => {
                                if (!error4) {
                                    callback(true)
                                } else {
                                    callback(false);
                                }
                            })
                        } else {
                            callback(false)
                        }
                    })
                } else {
                    callback(false);
                }
            })
        } else {
            callback(false)
        }
    })
}

// operation for deleting a data instance..
db.operations.delete = (directoryName, fileName, callback) => {
    fs.unlink(db.baseDirectory + directoryName + '/' + fileName + '.json', (error) => {
        if (!error) {
            callback(true);
        } else {
            callback(false);
        }
    })
}


module.exports = db