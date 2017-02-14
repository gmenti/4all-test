const rentalRepository = require('../repositories/rentalRepository');
const rentalMold = require('../molds/rentalMold');
const movieService = require('../services/movieService');

/**
 * Validate and create a new rental.
 *
 * @param {number} userId
 * @param {number} movieId
 * @returns {Promise}
 */
const create = (userId, movieId) => new Promise((resolve, reject) => {
  rentalMold.onCreate.test({ userId, movieId }).then(() => {
    movieService.checkIfMovieIsDisponible(movieId).then(() => {
      rentalRepository.create(userId, movieId).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    }).catch(() => {
      reject();
    });
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
  rentalMold.onDevolve.test({ userId, movieId }).then(() => {
    rentalRepository.devolve(userId, movieId).then(() => {
      resolve();
    }).catch((error) => {
      reject(error);
    });
  }).catch((error) => {
    reject(error);
  });
});

module.exports = {
  create,
  devolve,
};
