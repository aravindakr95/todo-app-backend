import HttpResponseType from '../enums/http/http-response-type';

import makeAuthList from '../auth/auth-list';

import { errorResponse } from '../helpers/http/response-dispatcher';

import { verifyAuthToken, decodeAuthToken } from '../helpers/auth/token-handler';
import { CustomException } from '../helpers/utilities/custom-exception';
import { objectHandler } from '../helpers/utilities/normalize-request';

async function validateProfile(userId) {
  try {
    const authList = makeAuthList();
    const result = await authList.findUserById(userId);

    return !!result;
  } catch (error) {
    CustomException(error.message);
  }
}

// token check middleware
// eslint-disable-next-line consistent-return
export default async function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    const user = verifyAuthToken(token);

    if (!authHeader || !token) {
      return errorResponse(res, {
        code: HttpResponseType.AUTH_REQUIRED,
        message: 'Bearer token is not presented or invalid',
      });
    }

    if (user && !user.userId) {
      return errorResponse(res, {
        code: HttpResponseType.AUTH_REQUIRED,
        message: 'Bearer token is not presented or invalid',
      });
    }

    const userId = decodeAuthToken(token);

    if (!userId) {
      return errorResponse(res, {
        code: HttpResponseType.AUTH_REQUIRED,
        message: 'Required fields are not available on token',
      });
    }

    const isValid = await validateProfile({ _id: userId });

    if (!isValid) {
      return errorResponse(res, {
        code: HttpResponseType.AUTH_REQUIRED,
        message: 'Present Authorization header does not match with available records',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    const { code, message } = error;
    return objectHandler({ code, message });
  }
}
