const userRouter = require('express').Router();
const {
  getUsers, getUserById, uppdateUser, uppdateAvatarUser,
} = require('../controllers/users');
const { validateUpdateateUser, validateUpdateateUserAvatar } = require('../utils/validator');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.patch('/me', validateUpdateateUser, uppdateUser);
userRouter.patch('/me/avatar', validateUpdateateUserAvatar, uppdateAvatarUser);
module.exports = userRouter;
