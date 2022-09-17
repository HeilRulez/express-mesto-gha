const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie) {
    throw new UnauthorizedError('Не авторизовано.');
  }
  try {
    if (!cookie.startsWith('jwt=')) {
      throw new UnauthorizedError('Не авторизовано.');
    }
    const token = cookie.replace('jwt=', '');
    req.user = jwt.verify(token, '671a191f3ef9128b01d4f624f9b51519941c7c2daa2790e71bd3956e74ca410f');
    next();
  } catch (err) {
    next(err);
  }
};
