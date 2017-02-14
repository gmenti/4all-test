const { mysql } = require('../databases');

/**
 * Get available books with optional filter by title.
 *
 * @param {?string} title
 * @returns {Promise}
 */
const getDisponibles = title => new Promise((resolve, reject) => {
  const queryToGetMovies = mysql('movies')
    .whereRaw('copies > (SELECT count(id) FROM rentals WHERE movie_id = movies.id AND returned_at IS NULL)');

  if (title) {
    queryToGetMovies.where('movies.title', 'like', `%${title}%`);
  }

  queryToGetMovies.then((rows) => {
    resolve(rows);
  }).catch((error) => {
    reject(error);
  });
});

/**
 * Check if exist a disponible movie with specific id.
 *
 * @param {number} id
 * @returns {Promise}
 */
const checkIfMovieIsDisponible = id => new Promise((resolve, reject) => {
  const subQuery = '(SELECT count(id) FROM rentals WHERE movie_id = movies.id AND returned_at IS NULL)';

  mysql('movies')
    .select('id')
    .where('id', id)
    .limit(1)
    .whereRaw(`copies > ${subQuery}`)
    .then((rows) => {
      if (rows.length > 0) {
        resolve();
      } else {
        reject();
      }
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = {
  getDisponibles,
  checkIfMovieIsDisponible,
};
