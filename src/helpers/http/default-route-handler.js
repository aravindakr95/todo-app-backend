import HttpResponseType from '../../enums/http/http-response-type';
import { objectHandler } from '../utilities/normalize-request';

const defaultRouteHandler = () => objectHandler({
  code: HttpResponseType.METHOD_NOT_ALLOWED,
  message: 'Request path or method not allowed',
});

module.exports = { defaultRouteHandler };
