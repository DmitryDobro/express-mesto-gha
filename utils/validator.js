const { celebrate, Joi } = require('celebrate');

const regex = /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?/;
// валидация создания пользователя
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),

  }),
});
// валидация авторизации
const validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});
// валидация изменения информации о пользователя
const validateUpdateateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
// валидация изменения аватара пользователя
const validateUpdateateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }),
});
// валидация создания карточки
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regex).required(),
  }),
});
// валидация изменения карточки
const validateUpdateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regex).required(),
  }),
});

module.exports = {
  validateCreateUser,
  validateUserAuth,
  validateCreateCard,
  validateUpdateateUser,
  validateUpdateateUserAvatar,
  validateUpdateCard,
};
