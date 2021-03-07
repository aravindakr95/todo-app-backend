import authenticateJWT from './auth-jwt';

describe('Auth JWT middleware tests', () => {
  let mockRequest;
  let mockResponse;
  const nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      errorResponse: jest.fn(),
    };
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should return Bearer token is not presented if token is not presented', async () => {
    const expectedResponse = {
      error: 'Bearer token is not presented',
    };
    await authenticateJWT(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.errorResponse).toBeCalledWith(expectedResponse);
  });

  test('should return Bearer token is in invalid format if user is null', async () => {
    const expectedResponse = {
      error: 'Bearer token is in invalid',
    };
    mockRequest = {
      headers: {},
    };
    await authenticateJWT(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  test('should invoke next if headers are verified', async () => {
    mockRequest = {
      headers: {
        Authorization: 'Bearer abc',
      },
    };
    await authenticateJWT(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
  });
});
