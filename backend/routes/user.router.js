import express from 'express'
import { UserLogin , UserRegister , AdminLogin } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register',UserRegister);
userRouter.post('/login',UserLogin);
userRouter.post('/admin',AdminLogin);

export default userRouter;