var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/Radio/Radio';
import PageSize from '../Resource/PageSize';
import { withNamespaces } from 'react-i18next';

var SettingPageSize = function (_Component) {
  _inherits(SettingPageSize, _Component);

  function SettingPageSize(props) {
    _classCallCheck(this, SettingPageSize);

    var _this = _possibleConstructorReturn(this, (SettingPageSize.__proto__ || Object.getPrototypeOf(SettingPageSize)).call(this, props));

    _this.handleChange = function (name) {
      return function (event) {
        var options = Object.assign({}, _this.props.options, _defineProperty({}, name, event.target.value));

        _this.props.onUpdateOptions(options);
      };
    };

    _this.getFormatOptions = function () {
      return Object.keys(PageSize.format).map(function (key) {
        return {
          label: PageSize.format[key],
          value: PageSize.format[key]
        };
      });
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(SettingPageSize, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          t = _props.t,
          options = _props.options;


      var current = React.createElement(
        Typography,
        { variant: 'caption' },
        options.format,
        '\xA0',
        t(options.orientation)
      );

      return React.createElement(
        ExpansionPanel,
        null,
        React.createElement(
          ExpansionPanelSummary,
          { expandIcon: React.createElement(ExpandMoreIcon, null) },
          React.createElement(
            Typography,
            null,
            t('sizeAndOrientation'),
            ' ',
            current
          )
        ),
        React.createElement(
          ExpansionPanelDetails,
          null,
          React.createElement(
            Grid,
            { container: true, spacing: 16 },
            React.createElement(
              Grid,
              { item: true, xs: 6 },
              React.createElement(
                FormControl,
                { component: 'fieldset' },
                React.createElement(
                  FormLabel,
                  { component: 'legend' },
                  t('paperSize')
                ),
                React.createElement(
                  RadioGroup,
                  {
                    'aria-label': t('paperSize'),
                    name: 'format',
                    value: this.props.options.format,
                    onChange: this.handleChange('format')
                  },
                  this.getFormatOptions().map(function (format) {
                    return React.createElement(FormControlLabel, {
                      key: format.label,
                      value: format.value,
                      control: React.createElement(Radio, null),
                      label: format.label
                    });
                  })
                )
              )
            ),
            React.createElement(
              Grid,
              { item: true, xs: 6 },
              React.createElement(
                FormControl,
                { component: 'fieldset' },
                React.createElement(
                  FormLabel,
                  { component: 'legend' },
                  t('paperOrientation')
                ),
                React.createElement(
                  RadioGroup,
                  {
                    'aria-label': t('paperOrientation'),
                    name: 'format',
                    value: this.props.options.orientation,
                    onChange: this.handleChange('orientation')
                  },
                  React.createElement(FormControlLabel, { value: 'portrait', control: React.createElement(Radio, null), label: t('portrait') }),
                  React.createElement(FormControlLabel, { value: 'landscape', control: React.createElement(Radio, null), label: t('landscape') })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return SettingPageSize;
}(Component);

SettingPageSize.propTypes = {
  options: PropTypes.object.isRequired,
  onUpdateOptions: PropTypes.func.isRequired
};

export default withNamespaces()(SettingPageSize);