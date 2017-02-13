const { MD5 } = require('crypto-js');

/**
 * Encrypt string to md5.
 *
 * @param {string} value
 * @returns {string}
 */
const encryptMD5 = value => MD5(value).toString();

module.exports = {
  encryptMD5,
};
