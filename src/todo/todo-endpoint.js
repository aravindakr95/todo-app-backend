import HttpResponseType from '../enums/http/http-response-type';

import { objectHandler } from '../helpers/utilities/normalize-request';
import { CustomException } from '../helpers/utilities/custom-exception';

export default function makeAuthEndPointHandler({ todoList, authList }) {
  async function addTodo(httpRequest) {
    const { body } = httpRequest;
    try {
      const user = await authList.findUserByEmail({ email: body.email }).catch((error) => {
        throw CustomException(error.message);
      });

      if (!user) {
        throw CustomException(
          'Todo user is not found on server',
          HttpResponseType.NOT_FOUND,
        );
      }

      await todoList.insertTodo(body).catch((error) => {
        throw CustomException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        message: `Todo created by '${user.email}' was successful`,
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.path) {
      case '/add':
        return addTodo(httpRequest);
      default:
        return objectHandler({
          code: HttpResponseType.METHOD_NOT_ALLOWED,
          message: `${httpRequest.method} method not allowed`,
        });
    }
  };
}
