const { FORBIDDEN_403 } = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN_403;
  }
}

module.exports = ForbiddenError;
