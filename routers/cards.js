const cardRouter = require('express').Router();
const {
  getCards, getCardById, createCard, putLikeCard, deleteLikeCard, deleteCard,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../utils/validator');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.get('/:cardId', validateCardId, getCardById);
cardRouter.put('/:cardId/likes', validateCardId, putLikeCard);
cardRouter.delete('/:cardId/likes', validateCardId, deleteLikeCard);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
module.exports = cardRouter;
