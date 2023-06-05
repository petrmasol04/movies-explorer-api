const userRouter = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { updatedUserValidation } = require('../middlewares/validation/usercelebrate');

userRouter.get('/me', getUser);
userRouter.patch('/me', updatedUserValidation, updateUser);

module.exports = userRouter;
