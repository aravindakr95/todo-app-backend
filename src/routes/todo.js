import express from 'express';

import todoController from '../todo/todo-controller';

import authenticateJWT from '../middlewares/auth-jwt';

const todoRouter = express.Router();

todoRouter.post('/add',
  authenticateJWT,
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
  (req, res) => {
    todoController(req, res);
  });

todoRouter.delete('/:todoId', (req, res) => {
  todoController(req, res);
});

module.exports = todoRouter;
