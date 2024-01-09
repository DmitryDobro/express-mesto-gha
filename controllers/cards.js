const Card = require('../model/Card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
const getCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).orFail(() => new Error('NotFoundError'));
    console.log(cardId);
    return res.status(200).send(card);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res.status(404).send({ message: 'Карточка по данному ID не найдена' });
    }
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Передан не валидный ID' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    return res.status(200).send(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Пераданы не валидные данные', error: error.message });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
const deleteCard = async (req, res) => {
  try {
    console.log(req.params);
    const deleteCard = await Card.findByIdAndDelete(req.params.cardId).orFail(() => new Error('NotFoundError'));
    return res.status(200).send(deleteCard);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res.status(404).send({ message: 'Карточка по данному ID не найдена' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
const putLikeCard = async (req, res) => {
  try {
    const likeCard = await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true }).orFail(
      () => new Error('NotFoundError')
    );
    return res.status(200).send(likeCard);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res.status(404).send({ message: 'Карточка по данному ID не найдена' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Пераданы не валидные данные', error: error.message });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
const deleteLikeCard = async (req, res) => {
  try {
    const dislikeCard = await Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true }).orFail(
      () => new Error('NotFoundError')
    );
    return res.status(200).send(dislikeCard);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return res.status(404).send({ message: 'Карточка по данному ID не найдена' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Пераданы не валидные данные', error: error.message });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};
module.exports = { getCards, getCardById, createCard, putLikeCard, deleteLikeCard, deleteCard };
