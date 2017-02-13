const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const { getUserByToken } = require('../services/authService');

/**
 * Http server instance.
 *
 * @type {?object}
 */
let server = null;

/**
 * Default port of http server.
 *
 * @type {number}
 */
const defaultPort = 3000;

/**
 * Auth routes.
 *
 * @returns {express.Router}
 */
const getAuthRoutes = () => {
  const authRoutes = express.Router();

  /* eslint no-param-reassign: 0 */
  authRoutes.use((request, response, next) => {
    const authorization = request.headers.authorization;

    if (authorization) {
      const matchs = new RegExp('Bearer\\s([\\w\\W]+)', 'g').exec(authorization);

      if (matchs) {
        const token = matchs[1];

        getUserByToken(token).then((user) => {
          request.user = user;
          next();
        }).catch(() => {
          response.status(403).send('Invalid authorization token!');
        });
      } else {
        response.status(403).send('Format of authorization token is invalid!');
      }
    } else {
      response.status(403).send('Authorization token not defined!');
    }
  });

  return authRoutes;
};

/**
 * Start http server.
 *
 * @param {number} port
 */
const start = (port = defaultPort) => {
  server = express();
  server.use(bodyParser.json());

  server.get('/login', authController.login);
  server.post('/register', authController.register);

  const authRoutes = getAuthRoutes();
  server.use(authRoutes);

  server.listen(port);
};

module.exports = {
  start,
};
