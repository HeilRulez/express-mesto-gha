const  { getUsers, getTargetUser, createUser, updataProfile, updataAvatar } = require('../controllers/users');
const routes = require('express').Router();

routes.get('/users', getUsers);
routes.get('/users/:userId', getTargetUser);
routes.post('/users', createUser);
routes.patch('/users/me', updataProfile);
routes.patch('/users/me/avatar', updataAvatar);

module.exports = routes;