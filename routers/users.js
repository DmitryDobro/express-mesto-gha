const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  uppdateUser,
  uppdateAvatarUser,
  getUserInfo,
} = require('../controllers/users');

const { validateUpdateateUser, validateUpdateateUserAvatar, validateUserId } = require('../utils/validator');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', validateUserId, getUserById);
userRouter.patch('/me', validateUpdateateUser, uppdateUser);
userRouter.patch('/me/avatar', validateUpdateateUserAvatar, uppdateAvatarUser);
module.exports = userRouter;
