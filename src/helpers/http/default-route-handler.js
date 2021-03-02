import { objectHandler } from '../utilities/normalize-request';
import HttpResponseType from '../../enums/http/http-response-type';

const defaultRouteHandler = () => objectHandler({
  code: HttpResponseType.METHOD_NOT_ALLOWED,
  message: 'Request path or method not allowed',
});

module.exports = { defaultRouteHandler };
