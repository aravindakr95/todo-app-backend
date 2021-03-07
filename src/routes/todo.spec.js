describe('Todo Router tests', () => {
  const postSpy = jest.fn();
  const getSpy = jest.fn();
  const putSpy = jest.fn();
  const deleteSpy = jest.fn();

  jest.doMock('express', () => ({
    Router() {
      return {
        post: postSpy,
        get: getSpy,
        put: putSpy,
        delete: deleteSpy,
      };
    },
  }));

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should invoke add todo route', () => {
    expect(postSpy).toHaveBeenCalledWith('/add');
  });

  test('should invoke get todo route', () => {
    expect(getSpy).toHaveBeenCalledWith('/');
  });

  test('should invoke update todo route', () => {
    expect(putSpy).toHaveBeenCalledWith('/603e68523dcf4d8ac725cda2');
  });

  test('should invoke delete todo route', () => {
    expect(deleteSpy).toHaveBeenCalledWith('/603e68523dcf4d8ac725cda2');
  });
});
