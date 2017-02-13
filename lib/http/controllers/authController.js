const authService = require('../../services/authService');

/**
 * Check if exist user with credentials and return token if exist.
 *
 * @param {object} request
 * @param {object} response
 */
const login = (request, response) => {
  const { email, password } = request.query;

  authService.login(email, password).then((user) => {
    response.json(user);
  }).catch(() => {
    response.status(404).json({});
  });
};

/**
 * Register a new user.
 *
 * @param {object} request
 * @param {object} response
 */
const register = (request, response) => {
  const { name, email, password } = request.body;

  authService.register(name, email, password).then((user) => {
    response.json(user);
  }).catch((errors) => {
    response.status(422).json(errors);
  });
};

module.exports = {
  login,
  register,
};
