const userRepository = require('../repositories/userRepository');
const userMold = require('../molds/userMold');
const { encryptMD5 } = require('../helpers/encryptionHelper');

/**
 * Validate and create a new user.
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
const create = (name, email, password) => new Promise((resolve, reject) => {
  userMold.test({ name, email, password }).then(() => {
    userRepository.create(name, email, encryptMD5(password)).then((user) => {
      resolve(user);
    }).catch((error) => {
      reject(error);
    });
  }).catch((error) => {
    reject(error);
  });
});

/**
 * Get user by credentials.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
const getByCredentials = (email, password) => new Promise((resolve, reject) => {
  userRepository.getByCredentials(email, encryptMD5(password)).then((user) => {
    resolve(user);
  }).catch((error) => {
    reject(error);
  });
});

/**
 * Get user by email.
 *
 * @param {string} email
 * @returns {Promise}
 */
const getByEmail = userRepository.getByEmail;

module.exports = {
  create,
  getByCredentials,
  getByEmail,
};
