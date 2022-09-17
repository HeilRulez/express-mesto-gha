const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, delTargetCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routes.get('/', getCards);
routes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().dataUri(),
  }),
}), createCard);
routes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), delTargetCard);
routes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
routes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = routes;
