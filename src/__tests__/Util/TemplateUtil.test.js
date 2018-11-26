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
          fontFamily: 'Open Sans',
          fontSize: 16,
          layoutRelative: false,
          borderWidth: defaults.border.width,
        }
      };

      // Id is unique
      delete component.i;

      expect(component).toEqual(expectedComponent);
    });
  });
});