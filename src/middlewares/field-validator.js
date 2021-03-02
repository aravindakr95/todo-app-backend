import { body, validationResult } from 'express-validator';

import HttpResponseType from '../enums/http/http-response-type';
import HttpMethod from '../enums/http/http-method';

import { errorResponse } from '../helpers/http/response-dispatcher';

function fieldStateChecker(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((error) => extractedErrors.push(error.msg));

  return errorResponse(res, {
    code: HttpResponseType.BAD_REQUEST,
    message: extractedErrors.join(', '),
  });
}

function authValidator(route) {
  switch (route) {
    case '/login':
      return [
        body('email')
          .exists().withMessage('Email is required')
          .isEmail()
          .withMessage('Email is in invalid format'),
        body('password')
          .exists().withMessage('Password is required')
          .isLength({ min: 8 })
          .withMessage('Password should be 8 characters long'),
      ];
    case '/register':
      return [
        body('fullName')
          .exists().withMessage('Full name is required')
          .isString()
          .withMessage('Full name should be String'),
        body('email')
          .exists().withMessage('Email is required')
          .isEmail()
          .withMessage('Email is not in valid format'),
        body('password')
          .exists().withMessage('Password is required')
          .isLength({ min: 8 })
          .withMessage('Password should be 8 characters long'),
      ];
    default:
      return [];
  }
}

function todosValidator(method) {
  switch (method) {
    case HttpMethod.POST:
      return [
        body('title')
          .exists().withMessage('Title is required')
          .isString()
          .withMessage('Title should be String'),
        body('description')
          .exists().withMessage('Description is required')
          .isString()
          .withMessage('Description should be String'),
      ];
    case HttpMethod.PUT:
      return [
        body('title')
          .optional()
          .isString()
          .withMessage('Title should be String'),
        body('description')
          .optional()
          .isString()
          .withMessage('Description should be String'),
      ];
    default:
      return [];
  }
}

function validate(main, route, method) {
  switch (main) {
    case 'auth':
      return authValidator(route);
    case 'todos':
      return todosValidator(method);
    default:
      return [];
  }
}

module.exports = { validate, fieldStateChecker };
