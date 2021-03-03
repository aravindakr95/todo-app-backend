import HttpResponseType from '../enums/http/http-response-type';
import HttpMethod from '../enums/http/http-method';

import loglevel from '../configs/log-level';

import { objectHandler } from '../helpers/utilities/normalize-request';
import customException from '../helpers/utilities/custom-exception';
import { defaultRouteHandler } from '../helpers/http/default-route-handler';

export default function makeAuthEndPointHandler({ todoList, authList }) {
  async function addTodo(httpRequest) {
    loglevel.info('[todo][addTodo]: Start');
    try {
      const { body } = httpRequest;
      const { userId } = httpRequest.instance;

      const user = await authList.findUserById({ _id: userId }).catch((error) => {
        throw customException(error.message);
      });

      if (!user) {
        throw customException(
          'User is not found on server',
          HttpResponseType.NOT_FOUND,
        );
      }

      await todoList.insertTodo({ ...body, userId }).catch((error) => {
        throw customException(error.message);
      });

      loglevel.info('[todo][addTodo]: Finish');

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        message: `Todo created by '${userId}' was successful`,
      });
    } catch (error) {
      const { code, message } = error;

      loglevel.error('[todo][addTodo]: Finish');
      return objectHandler({ code, message });
    }
  }

  async function getTodosByStatus(httpRequest) {
    loglevel.info('[todo][getTodosByStatus]: Start');
    try {
      const { userId, status } = httpRequest.queryParams;

      const result = await todoList.findTodosByUserId({ userId, status })
        .catch((error) => {
          throw customException(error.message);
        });

      loglevel.info('[todo][getTodosByStatus]: Finish');

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        data: result,
      });
    } catch (error) {
      const { code, message } = error;

      loglevel.error(message);
      loglevel.info('[todo][getTodosByStatus]: Finish');
      return objectHandler({ code, message });
    }
  }

  async function getAllTodos(httpRequest) {
    loglevel.info('[todo][getAllTodos]: Start');
    try {
      const { userId } = httpRequest.queryParams;

      const result = await todoList.findTodosByUserId({ userId })
        .catch((error) => {
          throw customException(error.message);
        });

      loglevel.info('[todo][getAllTodos]: Finish');

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        data: result,
      });
    } catch (error) {
      const { code, message } = error;

      loglevel.error(message);
      loglevel.info('[todo][getAllTodos]: Finish');
      return objectHandler({ code, message });
    }
  }

  async function updateTodo(httpRequest) {
    loglevel.info('[todo][updateTodo]: Start');
    try {
      const { body } = httpRequest;
      const { todoId } = httpRequest.pathParams;

      const data = await todoList.updateTodoById({ _id: todoId }, body)
        .catch((error) => {
          throw customException(error.message);
        });

      if (data && data.nModified < 1) {
        throw customException(
          `Requested Todo '${todoId}' is not found`,
          HttpResponseType.NOT_FOUND,
        );
      }

      loglevel.info('[todo][updateTodo]: Finish');

      return objectHandler({
        data,
        status: HttpResponseType.SUCCESS,
        message: `Todo '${todoId}' updated successful`,
      });
    } catch (error) {
      const { code, message } = error;

      loglevel.error(message);
      loglevel.info('[todo][updateTodo]: Finish');
      return objectHandler({ code, message });
    }
  }

  async function removeTodo(httpRequest) {
    loglevel.info('[todo][removeTodo]: Start');
    try {
      const { todoId } = httpRequest.pathParams;

      const data = await todoList.removeTodoById({ _id: todoId })
        .catch((error) => {
          throw customException(error.message);
        });

      if (data && data.deletedCount < 1) {
        throw customException(
          `Requested Todo '${todoId}' is not found`,
          HttpResponseType.NOT_FOUND,
        );
      }

      loglevel.info('[todo][removeTodo]: Finish');
      return objectHandler({
        data,
        status: HttpResponseType.SUCCESS,
        message: `Todo '${todoId}' removed successful`,
      });
    } catch (error) {
      const { code, message } = error;

      loglevel.error(message);
      loglevel.info('[todo][removeTodo]: Finish');
      return objectHandler({ code, message });
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case HttpMethod.POST:
        return addTodo(httpRequest);
      case HttpMethod.GET:
        if (httpRequest.queryParams.userId && httpRequest.queryParams.status) {
          return getTodosByStatus(httpRequest);
        }
        if (httpRequest.queryParams.userId) {
          return getAllTodos(httpRequest);
        }
        return defaultRouteHandler();
      case HttpMethod.PUT:
        return (httpRequest.pathParams.todoId) ? updateTodo(httpRequest)
          : defaultRouteHandler();
      case HttpMethod.DELETE:
        return (httpRequest.pathParams.todoId) ? removeTodo(httpRequest)
          : defaultRouteHandler();
      default:
        return defaultRouteHandler();
    }
  };
}
