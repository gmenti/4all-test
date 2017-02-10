const express = require('express');

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
 * Start http server.
 *
 * @param {number} port
 */
const start = (port = defaultPort) => {
  server = express();

  server.get('/', (request, response) => {
    response.send('Hello world');
  });

  server.listen(port);
};

module.exports = {
  start,
};
