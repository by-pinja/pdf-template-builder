import { scaleWidthTo } from '../../Util/Image';

describe('image util', () => {
  describe('scale width to', () => {
    test('will return proper image size', () => {
      expect(scaleWidthTo(10, { width: 20, height: 40 }))
        .toEqual({ width: 10, height: 20 });
    });
  });
});
