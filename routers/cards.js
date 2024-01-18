const cardRouter = require('express').Router();
const {
  getCards, getCardById, createCard, putLikeCard, deleteLikeCard, deleteCard,
} = require('../controllers/cards');
const { validateCreateCard } = require('../utils/validator');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.get('/:cardId', getCardById);
cardRouter.put('/:cardId/likes', putLikeCard);
cardRouter.delete('/:cardId/likes', deleteLikeCard);
cardRouter.delete('/:cardId', deleteCard);
module.exports = cardRouter;
