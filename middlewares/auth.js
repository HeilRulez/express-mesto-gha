const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie && !cookie.startsWith('jwt=')) {
    res.status(UNAUTHORIZED_ERROR).send({ message: 'Не авторизовано.' });
  } else {
    try {
      const token = cookie.replace('jwt=', '');
      req.user = jwt.verify(token, '671a191f3ef9128b01d4f624f9b51519941c7c2daa2790e71bd3956e74ca410f');
      next();
    } catch (err) {
      next(err);
    }
  }
};
