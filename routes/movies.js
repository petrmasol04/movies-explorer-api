const movieRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieId, validateMovieData } = require('../middlewares/validation/moviecelebrate');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovieData, createMovie);
movieRouter.delete('/:_id', validateMovieId, deleteMovie);

module.exports = movieRouter;
