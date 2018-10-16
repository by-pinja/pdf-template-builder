var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import WebFont from 'webfontloader';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { available } from '../config';

WebFont.load({
  google: {
    families: available.fonts
  }
});

var FontSelector = function (_Component) {
  _inherits(FontSelector, _Component);

  function FontSelector() {
    _classCallCheck(this, FontSelector);

    return _possibleConstructorReturn(this, (FontSelector.__proto__ || Object.getPrototypeOf(FontSelector)).apply(this, arguments));
  }

  _createClass(FontSelector, [{
    key: 'render',
    value: function render() {
      var fonts = available.fonts.slice().sort();

      return React.createElement(
        TextField,
        Object.assign({
          id: 'fontFamily',
          select: true,
          SelectProps: {}
        }, this.props),
        fonts.map(function (font) {
          return React.createElement(
            MenuItem,
            {
              key: font,
              value: font,
              style: { fontFamily: font }
            },
            font
          );
        })
      );
    }
  }]);

  return FontSelector;
}(Component);

export default FontSelector;