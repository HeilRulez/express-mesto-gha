const routes = require('express').Router();
const {
  getUsers, getUser, getTargetUser, updateProfile, updateAvatar,
} = require('../controllers/users');

routes.get('/', getUsers);
routes.get('/me', getUser);
routes.get('/:userId', getTargetUser);
routes.patch('/me', updateProfile);
routes.patch('/me/avatar', updateAvatar);

module.exports = routes;
