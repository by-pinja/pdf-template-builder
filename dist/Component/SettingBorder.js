var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import BorderBottomIcon from '@material-ui/icons/BorderBottom';
import BorderLeftIcon from '@material-ui/icons/BorderLeft';
import BorderRightIcon from '@material-ui/icons/BorderRight';
import BorderTopIcon from '@material-ui/icons/BorderTop';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';

var options = [{ value: 'left', icon: React.createElement(BorderLeftIcon, null) }, { value: 'right', icon: React.createElement(BorderRightIcon, null) }, { value: 'top', icon: React.createElement(BorderTopIcon, null) }, { value: 'bottom', icon: React.createElement(BorderBottomIcon, null) }];

var SettingBorder = function (_Component) {
  _inherits(SettingBorder, _Component);

  function SettingBorder() {
    _classCallCheck(this, SettingBorder);

    return _possibleConstructorReturn(this, (SettingBorder.__proto__ || Object.getPrototypeOf(SettingBorder)).apply(this, arguments));
  }

  _createClass(SettingBorder, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          t = _props.t,
          onChange = _props.onChange,
          value = _props.value;


      return React.createElement(
        ToggleButtonGroup,
        {
          value: value,
          onChange: onChange
        },
        options.map(function (_ref) {
          var value = _ref.value,
              icon = _ref.icon;
          return React.createElement(
            ToggleButton,
            { value: value, key: value },
            React.createElement(
              Tooltip,
              { title: t(value) },
              icon
            )
          );
        })
      );
    }
  }]);

  return SettingBorder;
}(Component);

SettingBorder.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired
};

export default withNamespaces()(SettingBorder);