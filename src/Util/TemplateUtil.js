import uuid from 'uuid/v4';
import { defaults } from '../config';

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
        fontFamily: 'Open Sans',
        fontSize: 16,
        layoutRelative: false,
        borderWidth: defaults.border.width,
        lineHeight: defaults.font.lineHeight,
      }
    };
  }
}

export default TemplateUtil;
