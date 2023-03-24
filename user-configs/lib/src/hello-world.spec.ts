import helloWorld from '~/hello-world';

describe('helloWorld', () => {
  it('should return hello world', () => {
    expect(helloWorld()).toEqual('Hello World');
  });
});
