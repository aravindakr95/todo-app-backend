describe('Auth Router tests', () => {
  const postSpy = jest.fn();

  jest.doMock('express', () => ({
    Router() {
      return {
        post: postSpy,
      };
    },
  }));

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should invoke register route', () => {
    expect(postSpy).toHaveBeenCalledWith('/register');
  });

  test('should invoke login route', () => {
    expect(postSpy).toHaveBeenCalledWith('/login');
  });
});
