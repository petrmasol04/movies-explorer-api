const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UnauthorizedError = require('../utils/error/unauthorized');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'имя пользователя должно быть не менее 2 символов'],
      maxlength: [30, 'имя пользователя должно быть не более 30 символов'],
      required: [true, 'не передано имя пользователя'],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, 'не передан e-mail пользователя'],
    },
    password: {
      type: String,
      required: [true, 'не передан пароль пользователя'],
      select: false,
    },
  },

  { toJSON: { useProjection: true }, toObject: { useProjection: true }, versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
