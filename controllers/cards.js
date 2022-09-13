const Card = require('../models/card');
const {
  OK, OK_ADD, BAD_REQUEST_ERROR, NOT_FOUND_ERROR, DEFAULT_ERROR, FORBIDDEN_ERROR,
} = require('../constants/constants');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(OK).send(cards);
  } catch (err) {
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(OK_ADD).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.' });
      return;
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.delTargetCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Какточка отсутствут.' });
      return;
    }
    if (!req.owner === req.user) {
      res.status(FORBIDDEN_ERROR).send({ message: 'Нет прав.' });
      return;
    }
    res.status(OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.' });
      return;
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Какточка отсутствут.' });
      return;
    }
    res.status(OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.' });
      return;
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Какточка отсутствут.' });
      return;
    }
    res.status(OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.' });
      return;
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};
