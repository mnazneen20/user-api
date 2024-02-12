// a simple function to convert buffer into javascript object.
const tojson = (data) => {
    let validData;
    try {
        validData = JSON.parse(data);
    } catch (error) {
        validData = {};
    }
    return validData;
}

module.exports = tojson;