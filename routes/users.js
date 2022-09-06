const routes = require('express').Router();
const {
  getUsers, getTargetUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

routes.get('/', getUsers);
routes.get('/:userId', getTargetUser);
routes.post('/', createUser);
routes.patch('/me', updateProfile);
routes.patch('/me/avatar', updateAvatar);

module.exports = routes;
