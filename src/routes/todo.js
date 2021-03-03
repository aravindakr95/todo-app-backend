import express from 'express';

import todoController from '../todo/todo-controller';

import authenticateJWT from '../middlewares/auth-jwt';
import { validate, fieldStateChecker } from '../middlewares/field-validator';

const todoRouter = express.Router();

todoRouter.post('/add',
  authenticateJWT,
  validate('todos', '/add', 'POST'),
  fieldStateChecker,
  (req, res) => {
    todoController(req, res);
  });

todoRouter.get('/',
  authenticateJWT,
  (req, res) => {
    todoController(req, res);
  });

todoRouter.put('/:todoId',
  authenticateJWT,
  validate('todos', '/:todoId', 'PUT'),
  fieldStateChecker,
  (req, res) => {
    todoController(req, res);
  });

todoRouter.delete('/:todoId', (req, res) => {
  todoController(req, res);
});

export default todoRouter;
