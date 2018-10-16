var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';

var SettingHorizontalAlign = function (_Component) {
  _inherits(SettingHorizontalAlign, _Component);

  function SettingHorizontalAlign() {
    _classCallCheck(this, SettingHorizontalAlign);

    return _possibleConstructorReturn(this, (SettingHorizontalAlign.__proto__ || Object.getPrototypeOf(SettingHorizontalAlign)).apply(this, arguments));
  }

  _createClass(SettingHorizontalAlign, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          t = _props.t,
          value = _props.value,
          defaultValue = _props.defaultValue,
          onChange = _props.onChange;


      return React.createElement(
        ToggleButtonGroup,
        {
          exclusive: true,
          value: value || defaultValue,
          onChange: onChange
        },
        React.createElement(
          ToggleButton,
          { value: 'left' },
          React.createElement(
            Tooltip,
            { title: t('alignLeft') },
            React.createElement(FormatAlignLeftIcon, null)
          )
        ),
        React.createElement(
          ToggleButton,
          { value: 'center' },
          React.createElement(
            Tooltip,
            { title: t('alignCenter') },
            React.createElement(FormatAlignCenterIcon, null)
          )
        ),
        React.createElement(
          ToggleButton,
          { value: 'right' },
          React.createElement(
            Tooltip,
            { title: t('alignRight') },
            React.createElement(FormatAlignRightIcon, null)
          )
        )
      );
    }
  }]);

  return SettingHorizontalAlign;
}(Component);

var allowedValues = ['left', 'center', 'right'];

SettingHorizontalAlign.propTypes = {
  value: PropTypes.oneOf(allowedValues),
  defaultValue: PropTypes.oneOf(allowedValues),
  onChange: PropTypes.func.isRequired
};

export default withNamespaces()(SettingHorizontalAlign);