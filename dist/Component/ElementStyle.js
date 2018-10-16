var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import BorderColorIcon from '@material-ui/icons/BorderColor';
import FontSelector from './FontSelector';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import Grid from '@material-ui/core/Grid/Grid';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SettingBorder from './SettingBorder';
import SettingColor from './SettingColor';
import SettingFontStyle from './SettingFontStyle';
import SettingHorizontalAlign from './SettingHorizontalAlign';
import SettingVerticalAlign from './SettingVerticalAlign';
import TextField from '@material-ui/core/TextField/TextField';
import { defaults } from '../config';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

var styles = function styles(theme) {
  return {
    root: {
      marginBottom: theme.spacing.unit * 2
    }
  };
};

var ElementStyle = function (_Component) {
  _inherits(ElementStyle, _Component);

  function ElementStyle(props) {
    _classCallCheck(this, ElementStyle);

    var _this = _possibleConstructorReturn(this, (ElementStyle.__proto__ || Object.getPrototypeOf(ElementStyle)).call(this, props));

    _this.handleChange = function (name) {
      return function (event, value) {
        var element = Object.assign({}, _this.props.element, _defineProperty({}, name, value));

        _this.props.onUpdateElement(element);
      };
    };

    _this.handleEventChange = function (name) {
      return function (event) {
        _this.handleChange(name)(event, event.target.value);
      };
    };

    _this.handleColorChange = function (color, event) {
      _this.handleChange('color')(event, color.hex);
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleColorChange = _this.handleColorChange.bind(_this);
    return _this;
  }

  _createClass(ElementStyle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          element = _props.element,
          t = _props.t;


      if (!element) {
        return '';
      }

      return React.createElement(
        Grid,
        { container: true, direction: 'row', spacing: 8, item: true, xs: 12 },
        React.createElement(
          Grid,
          { item: true, container: true, xs: 7, spacing: 8, justify: 'flex-start' },
          React.createElement(
            Grid,
            { item: true, xs: 12, container: true, spacing: 8 },
            React.createElement(
              Grid,
              { item: true, xs: 8 },
              React.createElement(FontSelector, {
                value: element.fontFamily,
                onChange: this.handleEventChange('fontFamily'),
                style: { width: '100%' }
              })
            ),
            React.createElement(
              Grid,
              { item: true, xs: 4 },
              React.createElement(TextField, {
                id: 'fontSize',
                type: 'number',
                value: element.fontSize || 12,
                onChange: this.handleEventChange('fontSize'),
                style: { width: '100%' },
                InputProps: {
                  endAdornment: React.createElement(
                    InputAdornment,
                    { variant: 'filled', position: 'end' },
                    'px'
                  )
                }
              })
            )
          ),
          React.createElement(
            Grid,
            { item: true, xs: 12, container: true, direction: 'row' },
            React.createElement(SettingFontStyle, {
              value: element.fontStyle,
              onChange: this.handleChange('fontStyle')
            }),
            React.createElement(SettingColor, {
              title: t('color'),
              value: element.color,
              defaultValue: defaults.font.color,
              onChange: this.handleChange('color'),
              icon: React.createElement(FormatColorTextIcon, null)
            })
          )
        ),
        React.createElement(
          Grid,
          { item: true, container: true, direction: 'row', xs: 5, spacing: 8 },
          React.createElement(
            Grid,
            { item: true },
            React.createElement(SettingHorizontalAlign, {
              value: element.horizontalAlignment,
              defaultValue: defaults.alignment.horizontal,
              onChange: this.handleChange('horizontalAlignment')
            })
          ),
          React.createElement(
            Grid,
            { item: true },
            React.createElement(SettingVerticalAlign, {
              value: element.verticalAlignment,
              defaultValue: defaults.alignment.vertical,
              onChange: this.handleChange('verticalAlignment')
            })
          )
        ),
        React.createElement(
          Grid,
          { item: true, container: true, direction: 'row', xs: 12 },
          React.createElement(
            Grid,
            { item: true },
            React.createElement(SettingBorder, {
              value: element.border || [],
              onChange: this.handleChange('border')
            })
          ),
          React.createElement(
            Grid,
            { item: true },
            React.createElement(SettingColor, {
              title: t('color'),
              value: element.borderColor,
              defaultValue: defaults.border.color,
              onChange: this.handleChange('borderColor'),
              icon: React.createElement(BorderColorIcon, null)
            })
          ),
          React.createElement(
            Grid,
            { item: true, xs: 2 },
            React.createElement(TextField, {
              id: 'borderWidth',
              type: 'number',
              value: element.borderWidth || defaults.border.width,
              onChange: this.handleEventChange('borderWidth'),
              InputProps: {
                endAdornment: React.createElement(
                  InputAdornment,
                  { variant: 'filled', position: 'end' },
                  'px'
                )
              }
            })
          )
        )
      );
    }
  }]);

  return ElementStyle;
}(Component);

ElementStyle.propTypes = {
  element: PropTypes.object,
  onUpdateElement: PropTypes.func.isRequired
};

export default withNamespaces()(withStyles(styles)(ElementStyle));