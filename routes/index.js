const router = require('express').Router();

const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const { validateSignUp, validateSignIn } = require('../middlewares/validators');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', validateSignIn, login);

router.post('/signup', validateSignUp, createUser);

router.use(auth);

router.use('/users', routerUsers);
router.use('/movies', routerMovies);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
