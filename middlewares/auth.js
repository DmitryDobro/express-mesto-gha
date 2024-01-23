const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.cookie;
    if (!token) {
      throw new AuthError('Неправильные почта или пароль');
    }
    const validToken = token.replace('jwt=', '');
    payload = jwt.verify(validToken, 'some-secret-key');
    req.user = payload;
    next();
  } catch (error) {
    if (error.message === 'NotAuthorization') {
      next(new AuthError('Неправильные почта или пароль'));
    } else {
      next(error);
    }
  }
};
module.exports = auth;
