var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component } from 'react';
import key from 'keymaster';
import PropTypes from 'prop-types';

var Keymaster = function (_Component) {
  _inherits(Keymaster, _Component);

  function Keymaster(props) {
    _classCallCheck(this, Keymaster);

    var _this = _possibleConstructorReturn(this, (Keymaster.__proto__ || Object.getPrototypeOf(Keymaster)).call(this, props));

    _this.handlers = {
      'backspace': _this.handleDelete,
      '⌘+z, ctrl+z': _this.handleUndo,
      '⌘+shift+z, ctrl+shift+z': _this.handleRedo,
      '⌘+b, ctrl+b': _this.handleFontStyle('bold'),
      '⌘+u, ctrl+u': _this.handleFontStyle('underline'),
      '⌘+i, ctrl+i': _this.handleFontStyle('italic')
    };


    _this.isElementSelected = _this.isElementSelected.bind(_this);
    _this.bindAll = _this.bindAll.bind(_this);
    _this.unbindAll = _this.unbindAll.bind(_this);
    return _this;
  }

  _createClass(Keymaster, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.bindAll();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindAll();
    }
  }, {
    key: 'bindAll',
    value: function bindAll() {
      var _this2 = this;

      Object.keys(this.handlers).forEach(function (keyCode) {
        var handler = _this2.handlers[keyCode];
        handler = handler.bind(_this2);

        key(keyCode, handler);
      });
    }
  }, {
    key: 'unbindAll',
    value: function unbindAll() {
      Object.keys(this.handlers).forEach(function (keyCode) {
        return key.unbind(keyCode);
      });
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete() {
      if (!this.isElementSelected()) {
        return;
      }

      this.props.onDeleteElement(this.props.selectedUuid);
    }
  }, {
    key: 'handleUndo',
    value: function handleUndo() {
      this.props.onUndo();
    }
  }, {
    key: 'handleRedo',
    value: function handleRedo() {
      this.props.onRedo();
    }
  }, {
    key: 'handleFontStyle',
    value: function handleFontStyle(prop) {
      var _this3 = this;

      return function () {
        if (!_this3.isElementSelected()) {
          return;
        }

        var _props = _this3.props,
            meta = _props.meta,
            fontStyle = _props.meta.fontStyle;


        var style = (fontStyle || []).slice();

        if (style.includes(prop)) {
          style.splice(style.indexOf(prop), 1);
        } else {
          style.push(prop);
        }

        _this3.props.onUpdateElement(Object.assign({}, meta, { fontStyle: style }));
      };
    }
  }, {
    key: 'isElementSelected',
    value: function isElementSelected() {
      return !!this.props.selectedUuid;
    }
  }, {
    key: 'render',
    value: function render() {
      return '';
    }
  }]);

  return Keymaster;
}(Component);

Keymaster.propTypes = {
  meta: PropTypes.object,
  selectedUuid: PropTypes.string,
  onDeleteElement: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  onUpdateElement: PropTypes.func.isRequired
};

export default Keymaster;