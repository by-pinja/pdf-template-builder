import { capitalize } from '../../Util/String';

describe('string util', () => {
  describe('capitalize', () => {
    test('will return text as capitalized', () => {
      expect(capitalize('uncapitalized')).toEqual('Uncapitalized');
    });
  });
});
