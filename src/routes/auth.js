import express from 'express';

import authController from '../auth/auth-controller';

import { validate, fieldStateChecker } from '../middlewares/field-validator';

const authRouter = express.Router();

authRouter.post('/register',
  validate('auth', '/register', 'POST'),
  fieldStateChecker,
  (req, res) => {
    authController(req, res);
  });

authRouter.post('/login',
  validate('auth', '/login', 'POST'),
  fieldStateChecker,
  (req, res) => {
    authController(req, res);
  });

export default authRouter;
