const modeller = require('modeller');
const { checkIfEmailIsNotInUse } = require('../repositories/userRepository');

/**
 * Register rule to check if email is not in use.
 */
modeller.register('unique_user_email', checkIfEmailIsNotInUse);

/**
 * Mold to validate on create a new user.
 *
 * @type {object}
 */
const onCreate = modeller.createMold({
  name: 'required|string|length:3,100',
  email: 'required|string|length:3,100|email|unique_user_email',
  password: 'required|string|length:6,50',
});

module.exports = {
  onCreate,
};
