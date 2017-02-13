const modeller = require('modeller');
const { checkIfMovieExists, checkIfMovieIsDisponible } = require('../repositories/movieRepository');
const { checkIfUserExists } = require('../repositories/userRepository');

/**
 * Register rule to check if user exist.
 */
modeller.register('user_exists', checkIfUserExists);

/**
 * Register rule to check if movie exists.
 */
modeller.register('movie_exists', checkIfMovieExists);

/**
 * Register rule to check if movie is disponible.
 */
modeller.register('movie_disponible', checkIfMovieIsDisponible);

/**
 * Mold to validate on create a new rental.
 *
 * @type {object}
 */
const onCreate = modeller.createMold({
  userId: 'required|number|user_exists',
  movieId: 'required|number|movie_disponible',
});

/**
 * Mold to validate on devolve a rental.
 *
 * @type {object}
 */
const onDevolve = modeller.createMold({
  userId: 'required|number|user_exists',
  movieId: 'required|number|movie_exists',
});

module.exports = {
  onCreate,
  onDevolve,
};
