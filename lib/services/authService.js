const userService = require('./userService');
const jwt = require('jsonwebtoken');

/**
 * Jwt password to generate token.
 *
 * @type {string}
 */
const jwtPassword = 'You shall not pass!';

/**
 * Generate token with email.
 *
 * @param {string} email
 * @returns {string}
 */
const generateTokenWithEmail = email => jwt.sign(email, jwtPassword);

/**
 * Generate token with email.
 *
 * @param {string} email
 * @returns {Promise}
 */
const getUserByToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, jwtPassword, (errorOnVerify, email) => {
    if (errorOnVerify) {
      reject(errorOnVerify);
    } else {
      userService.getByEmail(email).then((user) => {
        resolve(user);
      }).catch((error) => {
        reject(error);
      });
    }
  });
});

/**
 * Get user by credentials and return with token.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
const login = (email, password) => new Promise((resolve, reject) => {
  userService.getByCredentials(email, password).then((user) => {
    const userWithToken = user;
    userWithToken.token = generateTokenWithEmail(email);

    resolve(userWithToken);
  }).catch((error) => {
    reject(error);
  });
});

/**
 * Create a new user and return with token.
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
const register = (name, email, password) => new Promise((resolve, reject) => {
  userService.create(name, email, password).then((user) => {
    const userWithToken = user;
    userWithToken.token = generateTokenWithEmail(email);

    resolve(user);
  }).catch((error) => {
    reject(error);
  });
});

module.exports = {
  getUserByToken,
  login,
  register,
};
