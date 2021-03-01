import HttpResponseType from '../enums/http/http-response-type';

import { objectHandler } from '../helpers/utilities/normalize-request';
import signAuthToken from '../helpers/auth/token-handler';
import encryptField from '../helpers/auth/encryption-handler';

export default function makeAuthEndPointHandler({ authList }) {
  async function registerConsumer(httpRequest) {
    const { email, password } = httpRequest.body;
    try {
      const deviceToken = await signAuthToken(httpRequest.body).catch((error) => {
        throw error.message;
      });

      const updatedProps = {
        deviceToken,
        password: encryptField(password),
      };

      const userObj = { ...updatedProps, email };

      await authList.addUser(userObj).catch((error) => {
        throw error.message;
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

  return async function handle(httpRequest) {
    switch (httpRequest.path) {
      case '/register':
        return registerConsumer(httpRequest);
      default:
        return objectHandler({
          code: HttpResponseType.METHOD_NOT_ALLOWED,
          message: `${httpRequest.method} method not allowed`,
        });
    }
  };
}
