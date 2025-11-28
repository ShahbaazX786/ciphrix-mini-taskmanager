import express from 'express';
import { SignUp, SignIn } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.post('/signup', SignUp).post('/signin', SignIn);

export default Router;