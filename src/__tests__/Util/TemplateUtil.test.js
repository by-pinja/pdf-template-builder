import TemplateUtil from '../../Util/TemplateUtil';
import { defaults } from '../../config';

describe('template util', () => {
  describe('create component', () => {
    test('will return proper component', () => {
      const component = TemplateUtil.createComponent();

      const expectedComponent = {
        w: 1,
        h: 1,
        x: 0,
        y: 0,
        meta: {
          verticalAlignment: 'top',
          horizontalAlignment: 'left',
          fontFamily: 'Roboto',
          fontSize: 16,
          color: defaults.font.color,
          layoutRelative: false,
          borderWidth: defaults.border.width,
          lineHeight: defaults.font.lineHeight,
        }
      };

      // Id is unique
      delete component.i;

      expect(component).toEqual(expectedComponent);
    });
  });
});