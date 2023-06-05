const mongoose = require('mongoose');

const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'отсутствует страна создания фильма'],
    },
    director: {
      type: String,
      required: [true, 'отсутствует режиссёр фильма'],
    },
    duration: {
      type: Number,
      required: [true, 'отсутствует длительность фильма'],
    },
    year: {
      type: String,
      required: [true, 'отсутствует год выпуска фильма'],
    },
    description: {
      type: String,
      required: [true, 'отсутствует описание фильма'],
    },
    image: {
      type: String,
      required: [true, 'отсутствует ссылка на постер фильма'],
      validate: {
        validator: (v) => isUrl(v, { protocols: ['http', 'https'], require_protocol: true }),
        message: 'неверный формат ссылки на постер к фильму',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'отсутствует ссылка на трейлер фильма'],
      validate: {
        validator: (v) => isUrl(v, { protocols: ['http', 'https'], require_protocol: true }),
        message: 'неверный формат ссылки на трейлер фильма',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'отсутствует ссылка на миниатюрное изображение постера'],
      validate: {
        validator: (v) => isUrl(v, { protocols: ['http', 'https'], require_protocol: true }),
        message: 'неверный формат ссылки на миниатюрное изображение постера',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'отсутствует _id пользователя, который сохранил фильм'],
    },
    movieId: {
      type: Number,
      required: [true, 'отсутствует id фильма'],
    },
    nameRU: {
      type: String,
      required: [true, 'отсутствует название фильма на русском языке'],
    },
    nameEN: {
      type: String,
      required: [true, 'отсутствует название фильма на английском языке'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
