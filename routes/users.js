const  { getUsers, getTargetUser, createUser, updateProfile, updateAvatar } = require('../controllers/users');
const routes = require('express').Router();

routes.get('/users', getUsers);
routes.get('/users/:userId', getTargetUser);
routes.post('/users', createUser);
routes.patch('/users/me', updateProfile);
routes.patch('/users/me/avatar', updateAvatar);

module.exports = routes;