import express from 'express';

import todoController from '../todo/todo-controller';

const todoRouter = express.Router();

todoRouter.post('/add', (req, res) => {
  todoController(req, res);
});

todoRouter.get('/', (req, res) => {
  todoController(req, res);
});

todoRouter.put('/:todoId', (req, res) => {
  todoController(req, res);
});

module.exports = todoRouter;
