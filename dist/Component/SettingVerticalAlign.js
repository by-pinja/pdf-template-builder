var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignMiddleIcon from '@material-ui/icons/VerticalAlignCenter';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { withNamespaces } from 'react-i18next';

var SettingVerticalAlign = function (_Component) {
  _inherits(SettingVerticalAlign, _Component);

  function SettingVerticalAlign() {
    _classCallCheck(this, SettingVerticalAlign);

    return _possibleConstructorReturn(this, (SettingVerticalAlign.__proto__ || Object.getPrototypeOf(SettingVerticalAlign)).apply(this, arguments));
  }

  _createClass(SettingVerticalAlign, [{
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
          { value: 'top' },
          React.createElement(
            Tooltip,
            { title: t('alignTop') },
            React.createElement(VerticalAlignTopIcon, null)
          )
        ),
        React.createElement(
          ToggleButton,
          { value: 'middle' },
          React.createElement(
            Tooltip,
            { title: t('alignMiddle') },
            React.createElement(VerticalAlignMiddleIcon, null)
          )
        ),
        React.createElement(
          ToggleButton,
          { value: 'bottom' },
          React.createElement(
            Tooltip,
            { title: t('alignBottom') },
            React.createElement(VerticalAlignBottomIcon, null)
          )
        )
      );
    }
  }]);

  return SettingVerticalAlign;
}(Component);

var allowedValues = ['top', 'middle', 'bottom'];

SettingVerticalAlign.propTypes = {
  value: PropTypes.oneOf(allowedValues),
  defaultValue: PropTypes.oneOf(allowedValues),
  onChange: PropTypes.func.isRequired
};

export default withNamespaces()(SettingVerticalAlign);