const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({data: cards}))
  .catch(() => res.status(500).send({ message: 'Ошибка при получении карточек.'}));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({name, link})
  .then(card => res.send({data: card}))
  .catch(() => res.status(500).send({ message: 'Ошибка при создании карточки.'}));
};

module.exports.delTargetCard = (req, res) => {
  Card.findById(req.params.cardId)
  .then(card => res.send({data: card}))
  .catch(() => res.status(500).send({ message: 'Ошибка при удалении карточки.'}));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
  .then(card => res.send({data: card}))
  .catch(() => res.status(500).send({ message: 'Ошибка при постановке лайка.'}));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
  .then(card => res.send({data: card}))
  .catch(() => res.status(500).send({ message: 'Ошибка при удалении лайка.'}));
};