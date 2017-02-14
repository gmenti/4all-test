const modeller = require('modeller');

/**
 * Mold to validate on create a new rental.
 *
 * @type {object}
 */
const onCreate = modeller.createMold({
  userId: 'required|number',
  movieId: 'required|number',
});

/**
 * Mold to validate on devolve a rental.
 *
 * @type {object}
 */
const onDevolve = modeller.createMold({
  userId: 'required|number',
  movieId: 'required|number',
});

module.exports = {
  onCreate,
  onDevolve,
};
