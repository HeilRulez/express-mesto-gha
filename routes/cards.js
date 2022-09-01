const  { getCards, createCard, delTargetCard, likeCard, dislikeCard } = require('../controllers/cards');
const routes = require('express').Router();

routes.get('/cards', getCards);
routes.post('/cards', createCard);
routes.delete('/cards/:cardId', delTargetCard);
routes.put('/cards/:cardId/likes', likeCard);
routes.delete('/cards/:cardId/likes', dislikeCard);

module.exports = routes;