const  { getUsers, getTargetUser, createUser } = require('../controllers');
const router = require('express').Router();

router.get('/users', getUsers);
router.get('/users/:userId', getTargetUser);
router.post('/users', createUser);