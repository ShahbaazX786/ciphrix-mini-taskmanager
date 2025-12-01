import express from 'express';
import { getAllUsers, getUser, SignIn, SignOut, SignUp, VerifyOTP } from '../controllers/auth.controller.js';
import { checkToken } from '../middleware/checkToken.js';

const Router = express.Router();

Router.post('/signup', SignUp).post('/signin', SignIn).post('/signout', SignOut).post('/verify-otp', checkToken, VerifyOTP);
Router.get('/', getAllUsers);
Router.get('/:id', getUser);

export default Router;