const movieRepository = require('../repositories/movieRepository');

/**
 * Get available books with optional filter by title.
 *
 * @param {?string} title
 * @returns {Promise}
 */
const getDisponibles = movieRepository.getDisponibles;

module.exports = {
  getDisponibles,
};
