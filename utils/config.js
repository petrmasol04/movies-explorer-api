const { PORT = 3000, JWT_SECRET = 'some-secret-key' } = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
};
