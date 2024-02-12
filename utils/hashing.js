// dependencies
const crypto = require('crypto')

/**
 * 
 * @param {String} str - a string value
 * @returns {String} an encoded version of the input str.
 */
const hashing = (str) => {
    const hashedStr =
        crypto
            .createHash('sha256', process.env.NODE_CRYPTO_SECRET || 'mysecret')
            .update(str)
            .digest('hex');

    return hashedStr;
}

module.exports = hashing;