const movieService = require('../../services/movieService');
const rentalService = require('../../services/rentalService');

/**
 * Get disponible books with optional filter by title.
 *
 * @param {object} request
 * @param {object} response
 */
const disponibles = (request, response) => {
  const { title } = request.query;

  movieService.getDisponibles(title).then((users) => {
    response.json(users);
  }).catch((error) => {
    response.status(500).json(error);
  });
};

/**
 * Rental a movie.
 *
 * @param {object} request
 * @param {object} response
 */
const rent = (request, response) => {
  const movieId = parseFloat(request.params.id);

  rentalService.create(request.user.id, movieId).then(() => {
    response.status(204).send();
  }).catch((error) => {
    console.log(error);
    if (error) {
      response.status(422).json(error);
    } else {
      response.status(404).send();
    }
  });
};

/**
 * Devolve a movie.
 *
 * @param {object} request
 * @param {object} response
 */
const devolve = (request, response) => {
  const movieId = parseFloat(request.params.id);

  rentalService.devolve(request.user.id, movieId).then(() => {
    response.status(204).send();
  }).catch((error) => {
    if (error) {
      response.status(422).json(error);
    } else {
      response.status(404).send();
    }
  });
};

module.exports = {
  disponibles,
  rent,
  devolve,
};
