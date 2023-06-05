const Movie = require('../models/movie');
const NotFoundError = require('../utils/error/not-found');
const ForbiddenError = require('../utils/error/forbidden');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId }).populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ ...req.body, owner })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не обнаружен!');
      }
      const userId = req.user._id;
      const ownerId = movie.owner.toString();
      if (ownerId !== userId) {
        throw new ForbiddenError('Нельзя удалять чужой фильм!');
      }
      movie.deleteOne()
        .then(res.send({ message: 'Фильм удален' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
