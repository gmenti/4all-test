const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const movieController = require('./controllers/movieController');
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
 * Create and return auth router.
 *
 * @returns {express.Router}
 */
const getAuthRouter = () => {
  const authRouter = express.Router();

  authRouter.use((request, response, next) => {
    const authorization = request.headers.authorization;

    if (authorization) {
      const matchs = new RegExp('Bearer\\s([\\w\\W]+)', 'g').exec(authorization);

      if (matchs) {
        const token = matchs[1];

        getUserByToken(token).then((user) => {
          const requestWithUser = request;
          requestWithUser.user = user;

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

  return authRouter;
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
  server.get('/movies', movieController.disponibles);

  const authRouter = getAuthRouter();
  authRouter.post('/movies/:id/rent', movieController.rent);
  authRouter.patch('/movies/:id/devolve', movieController.devolve);

  server.use(authRouter);
  server.listen(port);
};

module.exports = {
  start,
};
