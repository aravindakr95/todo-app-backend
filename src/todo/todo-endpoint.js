import HttpResponseType from '../enums/http/http-response-type';

import { objectHandler } from '../helpers/utilities/normalize-request';
import { CustomException } from '../helpers/utilities/custom-exception';
import { defaultRouteHandler } from '../helpers/http/default-route-handler';

export default function makeAuthEndPointHandler({ todoList, authList }) {
  async function addTodo(httpRequest) {
    try {
      const { body } = httpRequest;
      const { userId } = body;

      const user = await authList.findUserById({ _id: userId }).catch((error) => {
        throw CustomException(error.message);
      });

      if (!user) {
        throw CustomException(
          'User is not found on server',
          HttpResponseType.NOT_FOUND,
        );
      }

      await todoList.insertTodo(body).catch((error) => {
        throw CustomException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        message: `Todo created by '${userId}' was successful`,
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  async function getTodos(httpRequest) {
    try {
      const { userId, status } = httpRequest.queryParams;

      const result = await todoList.findTodosByUserId({ userId, status })
        .catch((error) => {
          throw CustomException(error.message);
        });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        data: result,
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  async function updateTodo(httpRequest) {
    try {
      const { body } = httpRequest;
      const { todoId } = httpRequest.pathParams;

      const data = await todoList.updateTodoById({ _id: todoId }, body)
        .catch((error) => {
          throw CustomException(error.message);
        });

      if (data && data.nModified < 1) {
        throw CustomException(
          `Requested Todo '${todoId}' is not found`,
          HttpResponseType.NOT_FOUND,
        );
      }

      return objectHandler({
        data,
        status: HttpResponseType.SUCCESS,
        message: `Todo '${todoId}' updated successful`,
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  async function removeTodo(httpRequest) {
    try {
      const { todoId } = httpRequest.pathParams;

      const data = await todoList.removeTodoById({ _id: todoId })
        .catch((error) => {
          throw CustomException(error.message);
        });

      if (data && data.deletedCount < 1) {
        throw CustomException(
          `Requested Todo '${todoId}' is not found`,
          HttpResponseType.NOT_FOUND,
        );
      }

      return objectHandler({
        data,
        status: HttpResponseType.SUCCESS,
        message: `Todo '${todoId}' removed successful`,
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return addTodo(httpRequest);
      case 'GET':
        return (httpRequest.queryParams.userId && httpRequest.queryParams.status)
          ? getTodos(httpRequest)
          : defaultRouteHandler();
      case 'PUT':
        return (httpRequest.pathParams.todoId)
          ? updateTodo(httpRequest)
          : defaultRouteHandler();
      case 'DELETE':
        return (httpRequest.pathParams.todoId)
          ? removeTodo(httpRequest)
          : defaultRouteHandler();
      default:
        return defaultRouteHandler();
    }
  };
}
