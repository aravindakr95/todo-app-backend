import HttpResponseType from '../../enums/http/http-response-type';

const successResponse = (res, obj) => {
  const headers = { 'Content-Type': 'application/json' };
  const { status, message, data } = obj;
  const payload = {
    status,
    message: message || '',
    data: data || null,
  };
  return res
    .set(headers)
    .status(HttpResponseType.SUCCESS)
    .json(payload);
};

const errorResponse = (res, obj) => {
  const headers = { 'Content-Type': 'application/json' };
  const { code, message } = obj;
  const payload = {
    error: {
      code,
      message,
    },
  };
  return res
    .set(headers)
    .status(code)
    .json(payload);
};

export { successResponse, errorResponse };
