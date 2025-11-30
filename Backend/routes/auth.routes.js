import express from 'express';
import { SignUp, SignIn, SignOut } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.post('/signup', SignUp).post('/signin', SignIn).post('/signout', SignOut);

export default Router;