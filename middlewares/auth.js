// require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR, DEFAULT_ERROR } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
    return;
  }
  const token = authorization.replace('Bearer ', '');
  // const { JWT_SECRET } = process.env;
  try {
    req.user = jwt.verify(token, '671a191f3ef9128b01d4f624f9b51519941c7c2daa2790e71bd3956e74ca410f');
    next();
  } catch (err) {
    console.log(err.name);
    if (err.name === '') {
      res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
    }
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  }
};
