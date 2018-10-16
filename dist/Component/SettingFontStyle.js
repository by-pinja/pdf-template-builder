var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';

var SettingFontStyle = function (_Component) {
  _inherits(SettingFontStyle, _Component);

  function SettingFontStyle() {
    _classCallCheck(this, SettingFontStyle);

    return _possibleConstructorReturn(this, (SettingFontStyle.__proto__ || Object.getPrototypeOf(SettingFontStyle)).apply(this, arguments));
  }

  _createClass(SettingFontStyle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          t = _props.t,
          value = _props.value,
          onChange = _props.onChange;


      return React.createElement(
        ToggleButtonGroup,
        {
          value: value,
          onChange: onChange
        },
        React.createElement(
          ToggleButton,
          { value: 'bold' },
          React.createElement(
            Tooltip,
            { title: t('bold') },
            React.createElement(FormatBoldIcon, null)
          )
        ),
        React.createElement(
          ToggleButton,
          { value: 'italic' },
          React.createElement(
            Tooltip,
            { title: t('italic') },
            React.createElement(FormatItalicIcon, null)
          )
        ),
        React.createElement(
          ToggleButton,
          { value: 'underline' },
          React.createElement(
            Tooltip,
            { title: t('underline') },
            React.createElement(FormatUnderlinedIcon, null)
          )
        )
      );
    }
  }]);

  return SettingFontStyle;
}(Component);

SettingFontStyle.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default withNamespaces()(SettingFontStyle);