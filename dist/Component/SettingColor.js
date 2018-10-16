var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import Fade from '@material-ui/core/Fade/Fade';
import Paper from '@material-ui/core/Paper/Paper';
import Popper from '@material-ui/core/Popper/Popper';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton/ToggleButton';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { SketchPicker } from 'react-color';
import { withNamespaces } from 'react-i18next';

var SettingColor = function (_Component) {
  _inherits(SettingColor, _Component);

  function SettingColor(props) {
    _classCallCheck(this, SettingColor);

    var _this = _possibleConstructorReturn(this, (SettingColor.__proto__ || Object.getPrototypeOf(SettingColor)).call(this, props));

    _this.handleClickAway = _this.handleClickAway.bind(_this);
    _this.handlePopper = _this.handlePopper.bind(_this);

    _this.state = { ref: null, open: false };
    return _this;
  }

  _createClass(SettingColor, [{
    key: 'handleClickAway',
    value: function handleClickAway() {
      this.setState({
        open: false
      });
    }
  }, {
    key: 'handlePopper',
    value: function handlePopper(event) {
      event.persist();

      this.setState({
        open: !this.state.open,
        ref: event.target
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          value = _props.value,
          defaultValue = _props.defaultValue,
          _onChange = _props.onChange,
          icon = _props.icon;
      var _state = this.state,
          ref = _state.ref,
          open = _state.open;


      var id = open ? 'popper' : null;

      return React.createElement(
        ClickAwayListener,
        { onClickAway: this.handleClickAway },
        React.createElement(
          'div',
          { style: { display: 'inline-block' } },
          React.createElement(
            ToggleButton,
            { value: '', onClick: this.handlePopper },
            React.createElement(
              Tooltip,
              { title: title },
              icon
            ),
            React.createElement(ArrowDropDownIcon, null)
          ),
          React.createElement(
            Popper,
            {
              id: id,
              style: { zIndex: 100 },
              open: open,
              disablePortal: true,
              anchorEl: ref,
              transition: true
            },
            function (_ref) {
              var TransitionProps = _ref.TransitionProps;
              return React.createElement(
                Fade,
                Object.assign({}, TransitionProps, { timeout: 150 }),
                React.createElement(
                  Paper,
                  null,
                  React.createElement(SketchPicker, {
                    color: value || defaultValue,
                    onChange: function onChange(color, event) {
                      return _onChange(event, color.hex);
                    }
                  })
                )
              );
            }
          )
        )
      );
    }
  }]);

  return SettingColor;
}(Component);

SettingColor.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withNamespaces()(SettingColor);