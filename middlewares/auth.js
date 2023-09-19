const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/error/unauthorized');
const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // про
};

module.exports = {
  auth,
};
