import express from 'express';

import todoController from '../todo/todo-controller';

import authenticateJWT from '../middlewares/auth-jwt';
import { validate, fieldStateChecker } from '../middlewares/field-validator';

const todoRouter = express.Router();

/**
 * @swagger
 * definitions:
 *  Todo:
 *   type: object
 *   properties:
 *    title:
 *     type: string
 *     example: 'Test title'
 *    description:
 *     type: string
 *     example: 'Test description'
 *    status:
 *     type: string
 *     example: 'INACTIVE'
 *
 */

/**
 * @swagger
 * /v1/api/todos/add:
 *  post:
 *   summary: creates a todo document on database
 *   description: This route triggers the the create todo operation and creates a todo on database
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      schema:
 *       type: string
 *      required: true
 *      description: JWT Token
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the todo
 *      schema:
 *       $ref: '#/definitions/Todo'
 *   responses:
 *    200:
 *     description: Todo created by '603e681b3dcf4d8ac725cda1' was successful
 *    400:
 *     description: Description is required, Description should be String
 *    401:
 *     description: Bearer token is in invalid format
 *    500:
 *     description: Internal server error occurred
 */
todoRouter.post('/add',
  authenticateJWT,
  validate('todos', '/add', 'POST'),
  fieldStateChecker,
  (req, res) => {
    todoController(req, res);
  });

/**
 * @swagger
 * /v1/api/todos?userId=<user_id>&status=<status>:
 *  get:
 *   summary: get active, inactive or all todos for specific user
 *   description: This route can be uses to retrieve user based todo details
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      schema:
 *       type: string
 *      required: true
 *      description: JWT Token
 *   responses:
 *    200:
 *     description: Todo retrieval for user '603e681b3dcf4d8ac725cda1' was successful
 *    401:
 *     description: Bearer token is in invalid format
 *    500:
 *     description: Internal server error occurred
 */
todoRouter.get('/',
  authenticateJWT,
  (req, res) => {
    todoController(req, res);
  });

/**
 * @swagger
 * /v1/api/todos/<todo_id>:
 *  put:
 *   summary: Update existing todo fields for specific user
 *   description: This route can be uses to update user specific todo with or without updating all the fields
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      schema:
 *       type: string
 *      required: true
 *      description: JWT Token
 *    - in: path
 *      name: todoId
 *      schema:
 *       type: string
 *      required: true
 *      description: user specific todo id
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the update todo
 *      schema:
 *       $ref: '#/definitions/Todo'
 *   responses:
 *    200:
 *     description: Todo '603e681b3dcf4d8ac725cda1' updated successful
 *    404:
 *     description: Requested todo '603e681b3dcf4d8ac725cda1' not found
 *    401:
 *     description: Bearer token is in invalid format
 *    500:
 *     description: Internal server error occurred
 */
todoRouter.put('/:todoId',
  authenticateJWT,
  validate('todos', '/:todoId', 'PUT'),
  fieldStateChecker,
  (req, res) => {
    todoController(req, res);
  });

/**
 * @swagger
 * /v1/api/todos/<todo_id>:
 *  delete:
 *   summary: remove todo from database
 *   description: This route remove specific todo from the database
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      schema:
 *       type: string
 *      required: true
 *      description: JWT Token
 *    - in: path
 *      name: todo_id
 *      schema:
 *       type: string
 *      required: true
 *      description: todo id
 *   responses:
 *    200:
 *     description: Todo '603e681b3dcf4d8ac725cda1' removed successful
 *    404:
 *     description: Requested todo '603e681b3dcf4d8ac725cda1' not found
 *    401:
 *     description: Bearer token is in invalid format
 *    500:
 *     description: Internal server error occurred
 */
todoRouter.delete('/:todoId', (req, res) => {
  todoController(req, res);
});

export default todoRouter;
