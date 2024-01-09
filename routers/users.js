const userRouter = require('express').Router();
const {
  getUsers, getUserById, createUser, uppdateUser, uppdateAvatarUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', uppdateUser);
userRouter.patch('/me/avatar', uppdateAvatarUser);
module.exports = userRouter;
