const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');
const {
  OK, OK_ADD, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR, NOT_FOUND_ERROR, DEFAULT_ERROR,
} = require('../constants/constants');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(OK).send(users);
  } catch (err) {
    next(err);
    // res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.status(OK).send(user);
  } catch (err) {
    next(err);
    // res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.getTargetUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден.' });
    } else {
      res.status(OK).send(user);
    }
  } catch (err) {
    next(err);
    // if (err.kind === 'ObjectId') {
    //   res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.' });
    //   return;
    // }
    // res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    if (!validator.isEmail(email)) {
      res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректный Email.' });
    } else {
      const pasHash = await bcrypt.hash(password, 10);
      const user = await User.create({
        name, about, avatar, email, password: pasHash,
      });
      res.status(OK_ADD).send(user.toJSON());
    }
  } catch (err) {
    next(err);
    // if (err.name === 'ValidationError') {
    //   res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.' });
    //   return;
    // }
    // res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(OK).send(user);
  } catch (err) {
    next(err);
    // if (err.name === 'ValidationError') {
    //   res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.' });
    //   return;
    // }
    // res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(OK).send(user);
  } catch (err) {
    next(err);
    // if (err.name === 'ValidationError') {
    //   res.status(BAD_REQUEST_ERROR).send({ message: 'Неверные данные запроса.' });
    //   return;
    // }
    // res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(BAD_REQUEST_ERROR).send({ message: 'Некорректный Email.' });
  } else {
    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user && await !bcrypt.compare(password, user.password)) {
        res.status(UNAUTHORIZED_ERROR).send({ message: 'Неправильные почта или пароль.' });
      } else {
        const token = await jwt.sign(
          { _id: user._id },
          '671a191f3ef9128b01d4f624f9b51519941c7c2daa2790e71bd3956e74ca410f',
          { expiresIn: '7d' },
        );
        res.status(OK).cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        }).end();
      }
    } catch (err) {
      next(err);
      // res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
    }
  }
};
