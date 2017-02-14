const movieRepository = require('../repositories/movieRepository');

/**
 * Get available books with optional filter by title.
 *
 * @param {?string} title
 * @returns {Promise}
 */
const getDisponibles = movieRepository.getDisponibles;

/**
 * Check if exist a disponible movie with specific id.
 *
 * @param {number} id
 * @returns {Promise}
 */
const checkIfMovieIsDisponible = movieRepository.checkIfMovieIsDisponible;

module.exports = {
  getDisponibles,
  checkIfMovieIsDisponible,
};
