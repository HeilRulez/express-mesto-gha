const User = require('../models/user');

const DEFAULT_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const BAD_REQUEST_ERROR = 400;
const OK = 200;
const OK_ADD = 201;

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(OK).send(users);
  } catch {
    res.status(DEFAULT_ERROR).send({ message: `На сервере произошла ошибка.`})
  };
};

module.exports.getTargetUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(NOT_FOUND_ERROR).send({ message: `Пользователь не найден.`});
      return;
    }
    res.status(OK).send({user});
  } catch(err) {
    if (err.kind === 'ObjectId') {
      return res.status(BAD_REQUEST_ERROR).send({ message: `Неверные данные запроса.`});
    }
    res.status(DEFAULT_ERROR).send({ message: `На сервере произошла ошибка.`})
  };
};

module.exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body, {new: true, runValidators: true});
    return res.status(OK_ADD).send(user);
  } catch(err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: `Неверные данные запроса.`});
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.'})
  };
};

module.exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true, runValidators: true});
    res.status(OK).send(user);
  } catch(err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: `Неверные данные запроса.`});
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.'})
  };
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true, runValidators: true});
    res.status(OK).send(user);
  } catch(err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: `Неверные данные запроса.`});
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.'})
  };
};