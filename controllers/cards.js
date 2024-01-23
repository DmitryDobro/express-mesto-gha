const Card = require('../model/Card');
const NotFoundError = require('../errors/NotFoundErrors');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (error) {
    next(error);
  }
};
const getCardById = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).orFail(() => new NotFoundError('Карточка по данному ID не найдена'));
    res.status(200).send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ValidationError('Передан не валидный ID'));
    } else {
      next(error);
    }
  }
};
const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    res.status(201).send(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Пераданы не валидные данные'));
    } else {
      next(error);
    }
  }
};
const deleteCard = async (req, res, next) => {
  try {
    const selectCard = await Card.findById(req.params.cardId).orFail(
      new NotFoundError('Карточка по данному ID не найдена'),
    );
    if (selectCard.owner.toString() === req.user._id) {
      const card = await Card.findByIdAndDelete(req.params.cardId);
      res.status(200).send(card);
    } else {
      next(new ForbiddenError('Не являетесь владельцем карточи'));
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ValidationError('Передан не корректный ID'));
    } else {
      next(error);
    }
  }
};
const putLikeCard = async (req, res, next) => {
  try {
    const likeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Карточка по данному ID не найдена'));
    res.status(200).send(likeCard);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ValidationError('Передан не корректный ID'));
    } else {
      next(error);
    }
  }
};
const deleteLikeCard = async (req, res, next) => {
  try {
    const dislikeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Карточка по данному ID не найдена'));
    res.status(200).send(dislikeCard);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ValidationError('Передан не корректный ID'));
    } else {
      next(error);
    }
  }
};
module.exports = {
  getCards,
  getCardById,
  createCard,
  putLikeCard,
  deleteLikeCard,
  deleteCard,
};
