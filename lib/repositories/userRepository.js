const { mysql } = require('../databases');

/**
 * Users table.
 *
 * @type {object}
 */
const usersTable = mysql('users');

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

  usersTable.insert(user).then((ids) => {
    user.id = ids[0];
    resolve(user);
  }).catch((error) => {
    reject(error);
  });
});

module.exports = {
  create,
};
