var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    input: {
      display: 'flex',
      padding: 0
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center'
    },
    chip: {
      margin: theme.spacing.unit / 2 + 'px ' + theme.spacing.unit / 4 + 'px'
    },
    chipFocused: {
      backgroundColor: emphasize(theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08)
    },
    noOptionsMessage: {
      padding: theme.spacing.unit + 'px ' + theme.spacing.unit * 2 + 'px'
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0
    },
    divider: {
      height: theme.spacing.unit * 2
    }
  };
};

var NoOptionsMessage = function NoOptionsMessage(props) {
  return React.createElement(
    Typography,
    Object.assign({
      color: 'textSecondary',
      className: props.selectProps.classes.noOptionsMessage
    }, props.innerProps),
    props.children
  );
};

var inputComponent = function inputComponent(_ref) {
  var inputRef = _ref.inputRef,
      props = _objectWithoutProperties(_ref, ['inputRef']);

  return React.createElement('div', Object.assign({ ref: inputRef }, props));
};

var Control = function Control(props) {
  return React.createElement(TextField, Object.assign({
    fullWidth: true,
    InputProps: {
      inputComponent: inputComponent,
      inputProps: Object.assign({
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children
      }, props.innerProps)
    }
  }, props.selectProps.textFieldProps));
};

var Option = function Option(props) {
  return React.createElement(
    MenuItem,
    Object.assign({
      buttonRef: props.innerRef,
      selected: props.isFocused,
      component: 'div',
      style: {
        fontWeight: props.isSelected ? 500 : 400
      }
    }, props.innerProps),
    props.children
  );
};

var Placeholder = function Placeholder(props) {
  return React.createElement(
    Typography,
    Object.assign({
      color: 'textSecondary',
      className: props.selectProps.classes.placeholder
    }, props.innerProps),
    props.children
  );
};

var SingleValue = function SingleValue(props) {
  return React.createElement(
    Typography,
    Object.assign({ className: props.selectProps.classes.singleValue }, props.innerProps),
    props.children
  );
};

var ValueContainer = function ValueContainer(props) {
  return React.createElement(
    'div',
    { className: props.selectProps.classes.valueContainer },
    props.children
  );
};

var MultiValue = function MultiValue(props) {
  return React.createElement(Chip, {
    tabIndex: -1,
    label: props.children,
    className: classNames(props.selectProps.classes.chip, _defineProperty({}, props.selectProps.classes.chipFocused, props.isFocused)),
    onDelete: props.removeProps.onClick,
    deleteIcon: React.createElement(CancelIcon, props.removeProps)
  });
};

var Menu = function Menu(props) {
  return React.createElement(
    Paper,
    Object.assign({ square: true, className: props.selectProps.classes.paper }, props.innerProps),
    props.children
  );
};

var components = {
  Control: Control,
  Menu: Menu,
  MultiValue: MultiValue,
  NoOptionsMessage: NoOptionsMessage,
  Option: Option,
  Placeholder: Placeholder,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};

var MaterialSelect = function (_Component) {
  _inherits(MaterialSelect, _Component);

  function MaterialSelect() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, MaterialSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = MaterialSelect.__proto__ || Object.getPrototypeOf(MaterialSelect)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      single: null,
      multi: null
    }, _this.handleChange = function (name) {
      return function (value) {
        _this.setState(_defineProperty({}, name, value));
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MaterialSelect, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          theme = _props.theme;


      var selectStyles = {
        input: function input(base) {
          return Object.assign({}, base, {
            color: theme.palette.text.primary,
            '& input': {
              font: 'inherit'
            }
          });
        },
        groupHeading: function groupHeading(base) {
          return Object.assign({}, base, theme.typography.caption);
        }
      };

      return React.createElement(
        'div',
        { className: classes.root },
        React.createElement(Select, Object.assign({
          classes: classes,
          styles: selectStyles,
          components: components,
          textFieldProps: {
            label: this.props.label,
            InputLabelProps: {
              shrink: true
            }
          }
        }, this.props)),
        React.createElement('div', { className: classes.divider })
      );
    }
  }]);

  return MaterialSelect;
}(Component);

MaterialSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MaterialSelect);