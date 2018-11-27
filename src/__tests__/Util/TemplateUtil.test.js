import TemplateUtil from '../../Util/TemplateUtil';

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
          fontFamily: 'Arial',
          fontSize: 16,
          layoutRelative: false
        }
      };

      // Id is unique
      delete component.i;

      expect(component).toEqual(expectedComponent);
    });
  });
});