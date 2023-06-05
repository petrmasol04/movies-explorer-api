const router = require('express').Router();
const NotFoundError = require('../utils/error/not-found');
const { auth } = require('../middlewares/auth');
const { login, logout, createUsers } = require('../controllers/users');

const routerUsers = require('./users');
const routerMovies = require('./movies');
const { validateLoginData, validateUserData } = require('../middlewares/validation/usercelebrate');

router.post('/signin', validateLoginData, login);
router.post('/signup', validateUserData, createUsers);

router.post('/signout', auth, logout);
router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
