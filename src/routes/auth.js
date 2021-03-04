import express from 'express';

import authController from '../auth/auth-controller';

import { validate, fieldStateChecker } from '../middlewares/field-validator';

const authRouter = express.Router();

/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    fullName:
 *     type: string
 *     example: 'John Doe'
 *    email:
 *     type: string
 *     example: 'jonedoe@sample.com'
 *    password:
 *     type: string
 *     example: 'password@1'
 *  Todo:
 *   type: object
 *   properties:
 *    userId:
 *     type: string
 *     example: '603e681b3dcf4d8ac725cda1'
 *    title:
 *     type: string
 *     example: 'Title 1'
 *    description:
 *     type: string
 *     example: 'Description 1'
 *    status:
 *     status: string
 *     example: 'ACTIVE'
 */

/**
 * @swagger
 *   /v1/api/auth/register:
 *  post:
 *   summary: create new user to establish todos operations
 *   description: This route creates a new user
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the create user
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: User account 'john@sample.com' created successful
 *    400:
 *     description: Full name is required, Full name should be String
 *    409:
 *     description: User email 'john@sample.com' is already exists
 *    500:
 *     description: Internal server error occurred
 */
authRouter.post('/register',
  validate('auth', '/register', 'POST'),
  fieldStateChecker,
  (req, res) => {
    authController(req, res);
  });

/**
 * @swagger
 *   /v1/api/auth/login:
 *  post:
 *   summary: authenticate user to begin todos operations
 *   description: This route verify the user data with database
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the login user
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: User account 'john@sample.com' created successful
 *    400:
 *     description: Full name is required, Full name should be String
 *    409:
 *     description: User email 'john@sample.com' is already exists
 *    500:
 *     description: Internal server error occurred
 */
authRouter.post('/login',
  validate('auth', '/login', 'POST'),
  fieldStateChecker,
  (req, res) => {
    authController(req, res);
  });

export default authRouter;
