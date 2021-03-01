import handleAuthRequest from './index';

import HttpResponseType from '../enums/http/http-response-type';

import normalizedRequest from '../helpers/utilities/normalize-request';

import { successResponse, errorResponse } from '../helpers/http/response-dispatcher';

export default function authController(req, res) {
    const httpRequest = normalizedRequest(req);

    handleAuthRequest(httpRequest)
        .then(({ data }) => {
            if (data.status) {
                return successResponse(res, data);
            } else {
                return errorResponse(res, data);
            }
        })
        .catch((error) => {
            errorResponse(res, {
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message
            });
        });
}
