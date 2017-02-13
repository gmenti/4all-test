const { mysql } = require('../databases');

/**
 * Create a new user and return.
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
const create = (name, email, password) => new Promise((resolve, reject) => {
  const user = { name, email, password };

  mysql('users').insert(user).then((result) => {
    delete user.password;
    user.id = result[0];
    resolve(user);
  }).catch((error) => {
    reject(error);
  });
});

/**
 * Check if email is not in use by another existing user.
 *
 * @param {string} email
 * @returns {Promise}
 */
const checkIfEmailIsNotInUse = email => new Promise((resolve, reject) => {
  mysql('users')
    .where('email', email)
    .count('id as count')
    .then((result) => {
      if (result[0].count > 0) {
        reject();
      } else {
        resolve();
      }
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Get user by credentials (email, password)
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
const getByCredentials = (email, password) => new Promise((resolve, reject) => {
  mysql('users')
    .where('email', email)
    .where('password', password)
    .select('id', 'name', 'email')
    .then((result) => {
      if (result.length > 0) {
        resolve(result[0]);
      } else {
        reject();
      }
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Get user by email.
 *
 * @param {string} email
 * @returns {Promise}
 */
const getByEmail = email => new Promise((resolve, reject) => {
  mysql('users')
    .where('email', email)
    .select('id', 'name', 'email')
    .then((result) => {
      if (result.length > 0) {
        resolve(result[0]);
      } else {
        reject();
      }
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = {
  create,
  checkIfEmailIsNotInUse,
  getByCredentials,
  getByEmail,
};
