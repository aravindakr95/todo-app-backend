import HttpResponseType from '../enums/http/http-response-type';

import makeAuthList from '../auth/auth-list';

import loglevel from '../configs/log-level';

import { errorResponse } from '../helpers/http/response-dispatcher';

import { verifyAuthToken, decodeAuthToken } from '../helpers/auth/token-handler';

async function validateProfile(userId) {
  loglevel.info('[middlewares][validateProfile]: Start');
  try {
    const authList = makeAuthList();
    const result = await authList.findUserById(userId);

    loglevel.info('[middlewares][validateProfile]: Finish');
    return !!result;
  } catch (error) {
    loglevel.info(`[middlewares][validateProfile]: ${error.message}`);
    loglevel.info('[middlewares][validateProfile]: Finish');

    return false;
  }
}

// token check middleware
// eslint-disable-next-line consistent-return
export default async function authenticateJWT(req, res, next) {
  loglevel.info('[middlewares][authenticateJWT]: Start');
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    const user = verifyAuthToken(token);

    if (!authHeader || !token) {
      loglevel.error('[middlewares][authenticateJWT]: Bearer token is not presented');
      loglevel.info('[middlewares][authenticateJWT]: Finish');

      return errorResponse(res, {
        code: HttpResponseType.AUTH_REQUIRED,
        message: 'Bearer token is not presented',
      });
    }

    if (user && !user.userId) {
      loglevel.error('[middlewares][authenticateJWT]: Bearer token is in invalid format');
      loglevel.info('[middlewares][authenticateJWT]: Finish');

      return errorResponse(res, {
        code: HttpResponseType.AUTH_REQUIRED,
        message: 'Bearer token is in invalid format',
      });
    }

    const userId = decodeAuthToken(token);

    if (!userId) {
      loglevel.error('[middlewares][authenticateJWT]: Required fields are not available on token');
      loglevel.info('[middlewares][authenticateJWT]: Finish');

      return errorResponse(res, {
        code: HttpResponseType.AUTH_REQUIRED,
        message: 'Required fields are not available on token',
      });
    }

    const isValid = await validateProfile({ _id: userId });

    if (!isValid) {
      loglevel.error('[middlewares][authenticateJWT]: Present Authorization header does not comply with records');
      loglevel.info('[middlewares][authenticateJWT]: Finish');

      return errorResponse(res, {
        code: HttpResponseType.AUTH_REQUIRED,
        message: 'Present Authorization header does not comply with records',
      });
    }

    loglevel.info('[middlewares][authenticateJWT]: Finish');

    req.user = user;
    next();
  } catch (error) {
    loglevel.error(`[middlewares][authenticateJWT]: ${error.message}`);
    loglevel.info('[middlewares][authenticateJWT]: Finish');

    return errorResponse(res, {
      code: HttpResponseType.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
}
