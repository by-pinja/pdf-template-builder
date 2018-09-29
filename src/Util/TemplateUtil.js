import uuid from 'uuid/v4';

class TemplateUtil {
  static createComponent() {
    return {
      i: uuid(),
      w: 1,
      h: 1,
      x: 1,
      y: 1,
      meta: {
        verticalAlignment: 'top',
        horizontalAlignment: 'left',
        fontFamily: 'Open Sans',
        fontSize: 16
      }
    };
  }
}

export default TemplateUtil;
