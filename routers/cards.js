const cardRouter = require('express').Router();
const { getCards,getCardById, createCard, putLikeCard, deleteLikeCard, deleteCard } = require('../controllers/cards.js');
cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.get('/:cardId', getCardById);
cardRouter.put('/:cardId/likes', putLikeCard);
cardRouter.delete('/:cardId/likes', deleteLikeCard);
cardRouter.delete('/:id', deleteCard);
module.exports = cardRouter;
