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

  mysql('users').insert(user).then((rows) => {
    delete user.password;
    user.id = rows[0];
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
    .select('id')
    .where('email', email)
    .limit(1)
    .then((rows) => {
      if (rows.length > 0) {
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
    .select('id', 'name', 'email')
    .where('email', email)
    .where('password', password)
    .limit(1)
    .then((rows) => {
      if (rows.length > 0) {
        resolve(rows[0]);
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
    .select('id', 'name', 'email')
    .where('email', email)
    .limit(1)
    .then((rows) => {
      if (rows.length > 0) {
        resolve(rows[0]);
      } else {
        reject();
      }
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * Check if exist user with specific id.
 *
 * @param {number} id
 * @returns {Promise}
 */
const checkIfUserExists = id => new Promise((resolve, reject) => {
  mysql('users')
    .select('id')
    .where('id', id)
    .limit(1)
    .then((rows) => {
      if (rows.length > 0) {
        resolve();
      } else {
        reject();
      }
    });
});

module.exports = {
  create,
  checkIfEmailIsNotInUse,
  getByCredentials,
  getByEmail,
  checkIfUserExists,
};
