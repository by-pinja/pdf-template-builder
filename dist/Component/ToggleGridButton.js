var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import GridOff from '@material-ui/icons/GridOff';
import GridOn from '@material-ui/icons/GridOn';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';

var ToggleGridButton = function (_Component) {
  _inherits(ToggleGridButton, _Component);

  function ToggleGridButton(props) {
    _classCallCheck(this, ToggleGridButton);

    var _this = _possibleConstructorReturn(this, (ToggleGridButton.__proto__ || Object.getPrototypeOf(ToggleGridButton)).call(this, props));

    _this.handleToggle = _this.handleToggle.bind(_this);
    return _this;
  }

  _createClass(ToggleGridButton, [{
    key: 'handleToggle',
    value: function handleToggle() {
      this.props.onChangeGridVisibility(!this.props.gridVisible);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          gridVisible = _props.gridVisible,
          t = _props.t;


      var title = gridVisible ? t('hideGrid') : t('showGrid');
      var icon = gridVisible ? React.createElement(GridOff, null) : React.createElement(GridOn, null);

      return React.createElement(
        Tooltip,
        { title: title },
        React.createElement(
          'div',
          null,
          React.createElement(
            IconButton,
            {
              color: 'inherit',
              'aria-label': title,
              onClick: this.handleToggle
            },
            icon
          )
        )
      );
    }
  }]);

  return ToggleGridButton;
}(Component);

ToggleGridButton.propTypes = {
  gridVisible: PropTypes.bool.isRequired,
  onChangeGridVisibility: PropTypes.func.isRequired
};

export default withNamespaces()(ToggleGridButton);