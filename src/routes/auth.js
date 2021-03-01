import { Router } from 'express';

import authController from '../auth/auth-controller';

const authRouter = Router();

authRouter.post('/register', (req, res) => {
  authController(req, res);
});

authRouter.post('/login', (req, res) => {
  authController(req, res);
});

module.exports = authRouter;
