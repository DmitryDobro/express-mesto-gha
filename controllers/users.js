const { Error } = require('mongoose');
const User = require('../model/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).orFail(() => new Error('NotFoundError'));
    res.status(200).send(user);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      res.status(404).send({ message: 'Пользователь по данному ID не найден' });
    }
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Передан не валидный ID' });
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    res.status(201).send(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Пераданы не валидные данные', error: error.message });
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
const uppdateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const newUserData = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true }).orFail(() => new Error('NotFoundError'));
    res.status(200).send(newUserData);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      res.status(404).send({ message: 'Пользователь по данному ID не найден' });
    }
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Пераданы не валидные данные', error: error.message });
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
const uppdateAvatarUser = async (req, res) => {
  try {
    const { avatar } = req.body;
    const newUserAvatar = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true }).orFail(() => new Error('NotFoundError'));
    res.status(200).send(newUserAvatar);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      res.status(404).send({ message: 'Пользователь по данному ID не найден' });
    }
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Пераданы не валидные данные', error: error.message });
    }
    res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

module.exports = {
  getUsers, getUserById, createUser, uppdateUser, uppdateAvatarUser,
};
