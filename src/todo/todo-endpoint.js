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
      const { userId } = httpRequest.pathParams;
      const { status } = httpRequest.queryParams;

      const result = await todoList.findTodosByUserId({ userId, status });

      if (result && result.length) {
        return objectHandler({
          status: HttpResponseType.SUCCESS,
          data: result,
        });
      }
      throw CustomException(
        `Todos not found for user '${httpRequest.pathParams.userId}'`,
        HttpResponseType.NOT_FOUND,
      );
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
        return (httpRequest.pathParams.userId && httpRequest.queryParams.status)
          ? getTodos(httpRequest)
          : defaultRouteHandler();
      default:
        return defaultRouteHandler();
    }
  };
}
