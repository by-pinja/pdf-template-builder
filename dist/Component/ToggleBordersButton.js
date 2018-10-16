var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

var styles = function styles(theme) {
  return {
    disabled: {
      color: theme.palette.action.disabled
    }
  };
};

var ToggleBordersButton = function (_Component) {
  _inherits(ToggleBordersButton, _Component);

  function ToggleBordersButton(props) {
    _classCallCheck(this, ToggleBordersButton);

    var _this = _possibleConstructorReturn(this, (ToggleBordersButton.__proto__ || Object.getPrototypeOf(ToggleBordersButton)).call(this, props));

    _this.handleToggle = _this.handleToggle.bind(_this);
    return _this;
  }

  _createClass(ToggleBordersButton, [{
    key: 'handleToggle',
    value: function handleToggle() {
      this.props.onChangeBorderVisibility(!this.props.bordersVisible);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          bordersVisible = _props.bordersVisible,
          t = _props.t;

      var _ref = bordersVisible ? { classes: {} } : this.props,
          classes = _ref.classes;

      var title = bordersVisible ? t('hideBorders') : t('showBorders');

      return React.createElement(
        Tooltip,
        { title: title },
        React.createElement(
          'div',
          null,
          React.createElement(
            IconButton,
            {
              className: classes.disabled,
              color: 'inherit',
              'aria-label': title,
              onClick: this.handleToggle
            },
            React.createElement(FormatShapesIcon, null)
          )
        )
      );
    }
  }]);

  return ToggleBordersButton;
}(Component);

ToggleBordersButton.propTypes = {
  bordersVisible: PropTypes.bool.isRequired,
  onChangeBorderVisibility: PropTypes.func.isRequired
};

export default withNamespaces()(withStyles(styles)(ToggleBordersButton));