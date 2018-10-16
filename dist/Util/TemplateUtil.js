var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import uuid from 'uuid/v4';

var TemplateUtil = function () {
  function TemplateUtil() {
    _classCallCheck(this, TemplateUtil);
  }

  _createClass(TemplateUtil, null, [{
    key: 'createComponent',
    value: function createComponent() {
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
          layoutRelative: false
        }
      };
    }
  }]);

  return TemplateUtil;
}();

export default TemplateUtil;