const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateUserAuth } = require('../utils/validator');
const NotFoundError = require('../errors/NotFoundErrors');

router.post('/signin', validateUserAuth, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));
module.exports = router;
