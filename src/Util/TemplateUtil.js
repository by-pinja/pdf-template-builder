import uuid from 'uuid/v4';

class TemplateUtil {
  static createComponent() {
    return {
      i: uuid(),
      w: 1,
      h: 1,
      x: 1,
      y: 1,
      meta: {}
    };
  }
}

export default TemplateUtil;
