const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({data: users}))
  .catch(() => res.status(500).send({ message: 'Ошибка при получении списка пользователей.'}));
};

module.exports.getTargetUser = (req, res) => {
  User.findById(req.params._id)
  .then(user => res.send({data: user}))
  .catch(() => res.status(500).send({ message: 'Ошибка при получении пользователя.'}));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
  .then(user => res.send({data: user}))
  .catch(() => res.status(500).send({ message: 'Ошибка при создании пользователя.'}));
};