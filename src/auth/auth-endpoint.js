import HttpResponseType from '../enums/http/http-response-type';

import loglevel from '../configs/log-level';

import { objectHandler } from '../helpers/utilities/normalize-request';
import { CustomException } from '../helpers/utilities/custom-exception';

import { encryptField, compareField } from '../helpers/auth/encryption-handler';
import { signAuthToken } from '../helpers/auth/token-handler';

export default function makeAuthEndPointHandler({ authList }) {
  async function registerUser(httpRequest) {
    loglevel.info('[auth][registerUser]: Start');
    try {
      const { fullName, email, password } = httpRequest.body;

      const existCount = await authList.findUserIsExists({ email }).catch((error) => {
        throw CustomException(error.message);
      });

      if (existCount > 0) {
        throw CustomException(
          `User email '${email}' is already exists`,
          HttpResponseType.CONFLICT,
        );
      }

      const updatedProps = {
        password: encryptField(password),
      };

      const userObj = { ...updatedProps, email, fullName };

      await authList.insertUser(userObj).catch((error) => {
        throw CustomException(error.message);
      });

      loglevel.info('[auth][registerUser]: Finish');

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        message: `User account '${email}' created successful`,
      });
    } catch (error) {
      const { code, message } = error;

      loglevel.error(message);
      loglevel.info('[auth][registerUser]: Finish');
      return objectHandler({ code, message });
    }
  }

  async function loginUser(httpRequest) {
    loglevel.info('[auth][loginUser]: Start');
    let isValidPw = false;

    try {
      const { email, password } = httpRequest.body;
      const user = await authList.findUserByEmail({ email }).catch((error) => {
        throw CustomException(error.message);
      });

      if (user) {
        isValidPw = await compareField({
          password,
          hash: user.password,
        });
      }

      if (isValidPw) {
        const { _id: userId } = user;
        const authToken = await signAuthToken({ userId });

        return objectHandler({
          status: HttpResponseType.SUCCESS,
          data: { authToken },
          message: `User '${userId}' authentication successful`,
        });
      }

      throw CustomException(
        'Invalid email or password',
        HttpResponseType.AUTH_REQUIRED,
      );
    } catch (error) {
      const { code, message } = error;

      loglevel.error(message);
      loglevel.info('[auth][loginUser]: Finish');
      return objectHandler({ code, message });
    }
  }

  return async function handle(httpRequest) {
    switch (httpRequest.path) {
      case '/register':
        return registerUser(httpRequest);
      case '/login':
        return loginUser(httpRequest);
      default:
        return objectHandler({
          code: HttpResponseType.METHOD_NOT_ALLOWED,
          message: `${httpRequest.method} method not allowed`,
        });
    }
  };
}
