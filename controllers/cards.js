const Card = require('../models/card');

const DEFAULT_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const BAD_REQUEST_ERROR = 400;
const OK = 200;
const OK_ADD = 201;

const processingError = (err) => {
  switch(err.name) {
    case 'ValidationError': res.status(BAD_REQUEST_ERROR).send({ message: `Неверные данные запроса.`});
    break;
    case 'TypeError': res.status(NOT_FOUND_ERROR).send({ message: 'Какточка отсутствут.'});
    break;
    case 'CastError': res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.'});
    break;
    default: res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.'});
  }
};

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(OK).send(cards);
  } catch(err) {
    processingError(err)
  };
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({name, link, owner: req.user._id});
    res.status(OK_ADD).send(card);
  } catch(err) {
    processingError(err)
  };
};

module.exports.delTargetCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    await card.delete();
    res.status(OK).send(card);
  } catch(err) {
    processingError(err)
  };
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true });
    res.status(OK).send(card);
  } catch(err) {
    processingError(err)
  };
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    res.status(OK).send(card);
  } catch(err) {
    processingError(err)
  };
};