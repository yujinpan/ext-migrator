import { helloWorld } from './index';

describe('helloWorld', () => {
  it('should say', function () {
    expect(helloWorld('Hello, World!')).toBe(undefined);
  });
});
