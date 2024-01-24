const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const NotFoundError = require('../errors/NotFoundErrors');
const ValidationError = require('../errors/ValidationError');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').orFail(() => new AuthError('Неправильные почта или пароль'));
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
      );
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true, sameSite: true }).send(user);
    } else {
      throw new AuthError('Неправильные почта или пароль');
    }
  } catch (error) {
    next(error);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
const getUserInfo = async (req, res, next) => {
  try {
    const users = await User.findById(req.user.userId).orFail(() => new NotFoundError('Польователь по данному ID не найден'));
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(() => new NotFoundError('Польователь по данному ID не найден'));
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ValidationError('Передан не корректный ID'));
    } else {
      next(error);
    }
  }
};
const createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name, about, avatar, email, password: hashPassword,
    });
    res.status(201).send(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Пераданы не валидные данные'));
    } else if (error.code === 11000) {
      next(new ConflictError('Пользовательс с такой почтой уже существут'));
    } else {
      next(error);
    }
  }
};
const uppdateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const newUserData = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true }).orFail(() => new NotFoundError('Польователь по данному ID не найден'));
    res.status(200).send(newUserData);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Пераданы не валидные данные'));
    } else {
      next(error);
    }
  }
};
const uppdateAvatarUser = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const newUserAvatar = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true }).orFail(() => new NotFoundError('Польователь по данному ID не найден'));
    res.status(200).send(newUserAvatar);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Пераданы не валидные данные'));
    } else {
      next(error);
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  uppdateUser,
  uppdateAvatarUser,
  login,
  getUserInfo,
};
