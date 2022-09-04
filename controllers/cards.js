const Card = require('../models/card');

const DEFAULT_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const BAD_REQUEST_ERROR = 400;
const OK = 200;
const OK_ADD = 201;

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(OK).send(cards);
  } catch {
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.'})
  };
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({name, link, owner: req.user._id});
    res.status(OK_ADD).send(card);
  } catch(err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: `Неверные данные запроса.`});
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.'})
  };
};

module.exports.delTargetCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    await card.delete();
    res.status(OK).send(card);
  } catch(err) {
    if (err.name === 'TypeError') {
      res.status(NOT_FOUND_ERROR).send({ message: 'Какточка отсутствут.'});
      return;
    }
    if(err.name === 'CastError') {
      res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.'});
      return;
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.'})
  };
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true });
    res.status(OK).send(card);
  } catch(err) {
    if (err.name === 'TypeError') {
      res.status(NOT_FOUND_ERROR).send({ message: 'Какточка отсутствут.'});
      return;
    }
    if(err.name === 'CastError') {
      res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.'});
      return;
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.'})
  };
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    res.status(OK).send(card);
  } catch(err) {
    if (err.name === 'TypeError') {
      res.status(NOT_FOUND_ERROR).send({ message: 'Какточка отсутствут.'});
      return;
    }
    if(err.name === 'CastError') {
      res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.'});
      return;
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.'})
  };
};