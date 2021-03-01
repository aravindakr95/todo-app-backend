import HttpResponseType from '../enums/http/http-response-type';

import { objectHandler } from '../helpers/utilities/normalize-request';
import { CustomException } from '../helpers/utilities/custom-exception';

import { encryptField, compareField } from '../helpers/auth/encryption-handler';
import signAuthToken from '../helpers/auth/token-handler';

export default function makeAuthEndPointHandler({ authList }) {
  async function registerUser(httpRequest) {
    const { email, password } = httpRequest.body;
    try {
      const deviceToken = await signAuthToken(httpRequest.body).catch((error) => {
        throw CustomException(error.message);
      });

      const updatedProps = {
        deviceToken,
        password: encryptField(password),
      };

      const userObj = { ...updatedProps, email };

      await authList.addUser(userObj).catch((error) => {
        throw CustomException(error.message);
      });

      return objectHandler({
        status: HttpResponseType.SUCCESS,
        message: `User account '${email}' created successful`,
      });
    } catch (error) {
      const { code, message } = error;
      return objectHandler({ code, message });
    }
  }

  async function loginUser(httpRequest) {
    let isValidPw = false;
    const { email, password } = httpRequest.body;

    try {
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
        const { deviceToken } = user;

        return objectHandler({
          status: HttpResponseType.SUCCESS,
          data: { accessToken: deviceToken },
          message: `User '${email}' authentication successful`,
        });
      }

      throw CustomException(
        'Invalid email or password',
        HttpResponseType.AUTH_REQUIRED,
      );
    } catch (error) {
      const { code, message } = error;
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
