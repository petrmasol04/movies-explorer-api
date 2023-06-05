const { UNAUTHORIZED_401 } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = UNAUTHORIZED_401;
  }
}

module.exports = UnauthorizedError;
