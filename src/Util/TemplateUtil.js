import uuid from 'uuid/v4';

class TemplateUtil {
  static createComponent() {
    return {
      i: uuid(),
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
  }
}

export default TemplateUtil;
