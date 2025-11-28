import express from 'express';
import { SignUp } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.post('/signup', SignUp);

export default Router;