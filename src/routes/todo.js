import express from 'express';

import todoController from '../todo/todo-controller';

const todoRouter = express.Router();

todoRouter.post('/add', (req, res) => {
  todoController(req, res);
});

todoRouter.get('/:userId', (req, res) => {
  todoController(req, res);
});

module.exports = todoRouter;
