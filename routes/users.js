const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, getTargetUser, updateProfile, updateAvatar,
} = require('../controllers/users');

routes.get('/', getUsers);
routes.get('/me', celebrate({
  user: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), getUser);
routes.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getTargetUser);
routes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  user: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), updateProfile);
routes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().dataUri(),
  }),
  user: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), updateAvatar);

module.exports = routes;
