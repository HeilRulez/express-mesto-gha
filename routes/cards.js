const routes = require('express').Router();
const {
  getCards, createCard, delTargetCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routes.get('/', getCards);
routes.post('/', createCard);
routes.delete('/:cardId', delTargetCard);
routes.put('/:cardId/likes', likeCard);
routes.delete('/:cardId/likes', dislikeCard);

module.exports = routes;
