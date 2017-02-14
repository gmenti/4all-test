const { mysql } = require('../databases');

/**
 * Create a new rental.
 *
 * @param {number} userId
 * @param {number} movieId
 * @returns {Promise}
 */
const create = (userId, movieId) => new Promise((resolve, reject) => {
  const rental = {
    user_id: userId,
    movie_id: movieId,
  };

  mysql('rentals').insert(rental).then(() => {
    resolve();
  }).catch((error) => {
    reject(error);
  });
});

/**
 * Set returned at to actual date.
 *
 * @param {number} userId
 * @param {number} movieId
 * @returns {Promise}
 */
const devolve = (userId, movieId) => new Promise((resolve, reject) => {
  mysql('rentals')
    .where('user_id', userId)
    .where('movie_id', movieId)
    .whereRaw('returned_at IS NULL')
    .update('returned_at', new Date())
    .orderBy('returned_at', 'asc')
    .limit(1)
    .then((result) => {
      if (result === 0) {
        reject();
      } else {
        resolve();
      }
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = {
  create,
  devolve,
};
