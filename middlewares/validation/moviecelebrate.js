const { celebrate, Joi } = require('celebrate');
const { patternLink } = require('../../utils/constants');

const validateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4),
    description: Joi.string().required(),
    image: Joi.string().required().regex(patternLink),
    trailerLink: Joi.string().required().regex(patternLink),
    thumbnail: Joi.string().required().regex(patternLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateMovieData,
  validateMovieId,
};
