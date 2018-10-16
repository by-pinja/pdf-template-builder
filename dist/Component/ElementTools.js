var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Card from '@material-ui/core/Card/Card';
import Typography from '@material-ui/core/Typography/Typography';
import CardContent from '@material-ui/core/CardContent/CardContent';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Delete from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import MaterialSelect from './MaterialSelect';
import ElementStyleContainer from '../Container/ElementStyleContainer';
import { capitalize } from '../Util/String';
import { scaleWidthTo, getSizeOf } from '../Util/Image';
import { withNamespaces } from 'react-i18next';

var styles = function styles(theme) {
  return {
    actionButton: {
      float: 'right',
      marginLeft: theme.spacing.unit
    },
    card: {
      overflow: 'visible'
    },
    select: {
      width: '100%'
    },
    iconLeft: {
      marginRight: theme.spacing.unit
    }
  };
};

var ElementTools = function (_Component) {
  _inherits(ElementTools, _Component);

  function ElementTools(props) {
    _classCallCheck(this, ElementTools);

    var _this = _possibleConstructorReturn(this, (ElementTools.__proto__ || Object.getPrototypeOf(ElementTools)).call(this, props));

    _this.handleChange = function (name) {
      return function (event) {
        var element = Object.assign({}, _this.props.element, _defineProperty({}, name, event.target ? event.target.value : event.length !== undefined ? null : event));

        _this.props.onUpdateElement(element);
      };
    };

    _this.handleChangeCheckbox = function (name) {
      return function (event) {
        var element = Object.assign({}, _this.props.element, _defineProperty({}, name, event.target.checked));

        _this.props.onUpdateElement(element);
      };
    };

    _this.handleImageUpload = function (event) {
      if (!event.target.files.length) {
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = function () {
        getSizeOf(reader.result, function (size) {
          var element = Object.assign({}, _this.props.element, {
            image: reader.result
          });

          // Scale image container down or up to some proper size

          var _scaleWidthTo = scaleWidthTo(10, size),
              width = _scaleWidthTo.width,
              height = _scaleWidthTo.height;

          _this.props.onResizeElement(element.i, width, height);
          _this.props.onUpdateElement(element);
        });
      };

      reader.onerror = console.error;
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleChangeCheckbox = _this.handleChangeCheckbox.bind(_this);
    _this.handleImageUpload = _this.handleImageUpload.bind(_this);
    return _this;
  }

  _createClass(ElementTools, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      if (!props.element || this.props.element && this.props.element.i === props.element.i) {
        return;
      }

      // Automatically open the image input
      if (props.element.type === 'image' && !props.element.image && (!props.element.tag || !props.element.tag.type === 'image')) {
        setTimeout(function () {
          return _this2.fileInput.click();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          classes = _props.classes,
          element = _props.element,
          t = _props.t,
          schema = _props.schema;


      if (!element) {
        return '';
      }

      var selectedOption = null;

      if (element.tag) {
        // Flatten the grouped schema and find the matching prop
        selectedOption = [].concat.apply([], schema.map(function (_ref) {
          var options = _ref.options;
          return options;
        })).find(function (_ref2) {
          var tag = _ref2.tag;
          return tag === element.tag.value;
        }) || null;
      }

      var isImage = element.type === 'image';
      var isGroup = element.type === 'group';
      var isText = element.type === 'text';

      return React.createElement(
        Card,
        { className: classes.card },
        React.createElement(
          CardContent,
          null,
          React.createElement(
            Grid,
            { container: true, spacing: 16, direction: 'column' },
            React.createElement(
              Grid,
              { item: true, xs: 12 },
              React.createElement(
                Typography,
                { color: 'textSecondary', variant: 'headline' },
                t('elementSettings', { type: capitalize(t(element.type)) }),
                !element.required && React.createElement(
                  Tooltip,
                  { title: t('deleteThisElement', { type: t(element.type).toLowerCase() }) },
                  React.createElement(
                    Button,
                    {
                      variant: 'fab',
                      color: 'secondary',
                      'aria-label': 'Remove',
                      mini: true,
                      className: classes.actionButton,
                      onClick: this.props.onRemoveElement
                    },
                    React.createElement(Delete, null)
                  )
                )
              )
            ),
            (isText || isGroup) && React.createElement(
              Grid,
              { item: true, xs: 12 },
              React.createElement(ElementStyleContainer, null)
            ),
            isGroup && React.createElement(
              Grid,
              { item: true, xs: 12 },
              React.createElement(
                FormGroup,
                { row: true },
                React.createElement(FormControlLabel, {
                  control: React.createElement(Switch, {
                    checked: this.props.element.layoutRelative,
                    onChange: this.handleChangeCheckbox('layoutRelative'),
                    value: 'layoutRelative'
                  }),
                  label: t('layoutRelative')
                })
              )
            ),
            isImage && React.createElement(
              Grid,
              { item: true, xs: 6 },
              React.createElement('input', {
                id: 'file-input',
                accept: 'image/*',
                type: 'file',
                style: { display: 'none' },
                onChange: this.handleImageUpload,
                ref: function ref(input) {
                  return _this3.fileInput = input;
                }
              }),
              React.createElement(
                'label',
                { htmlFor: 'file-input' },
                React.createElement(
                  Button,
                  { variant: 'raised', color: 'primary', component: 'span' },
                  React.createElement(AddAPhoto, { className: classes.iconLeft }),
                  t('uploadImage')
                )
              )
            ),
            React.createElement(
              Grid,
              { item: true, xs: 12 },
              React.createElement(MaterialSelect, {
                id: 'tag',
                label: t('bindToProperty'),
                className: classes.select,
                value: selectedOption,
                getOptionLabel: function getOptionLabel(_ref3) {
                  var text = _ref3.text;
                  return text;
                },
                getOptionValue: function getOptionValue(_ref4) {
                  var tag = _ref4.tag;
                  return tag;
                },
                onChange: function onChange(_ref5) {
                  var tag = _ref5.tag;
                  return _this3.handleChange('tag')(tag ? { value: tag } : []);
                },
                placeholder: t('bindToProperty'),
                options: schema
              })
            ),
            isText && React.createElement(
              Grid,
              { item: true, xs: 12 },
              React.createElement(TextField, {
                id: 'content',
                label: t('content'),
                className: classes.select,
                value: this.props.element.content || '',
                onChange: this.handleChange('content'),
                margin: 'normal'
              })
            )
          )
        )
      );
    }
  }]);

  return ElementTools;
}(Component);

ElementTools.propTypes = {
  element: PropTypes.object,
  schema: PropTypes.array.isRequired,
  onRemoveElement: PropTypes.func.isRequired,
  onUpdateElement: PropTypes.func.isRequired,
  onResizeElement: PropTypes.func.isRequired
};

export default withNamespaces()(withStyles(styles)(ElementTools));