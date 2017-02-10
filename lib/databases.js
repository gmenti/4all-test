const knex = require('knex');

/**
 * Mysql connection instance.
 *
 * @type {object}
 */
const mysql = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'secret',
    database: '4movies',
  },
});

module.exports = {
  mysql,
};
