var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Redo from '@material-ui/icons/Redo';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

var RedoButton = function (_Component) {
  _inherits(RedoButton, _Component);

  function RedoButton() {
    _classCallCheck(this, RedoButton);

    return _possibleConstructorReturn(this, (RedoButton.__proto__ || Object.getPrototypeOf(RedoButton)).apply(this, arguments));
  }

  _createClass(RedoButton, [{
    key: 'render',
    value: function render() {
      var t = this.props.t;


      return React.createElement(
        Tooltip,
        { title: t('doRedo') },
        React.createElement(
          'div',
          null,
          React.createElement(
            IconButton,
            {
              color: 'inherit',
              'aria-label': t('doRedo'),
              onClick: this.props.canRedo ? this.props.onRedo : undefined,
              disabled: !this.props.canRedo
            },
            React.createElement(Redo, null)
          )
        )
      );
    }
  }]);

  return RedoButton;
}(Component);

RedoButton.propTypes = {
  canRedo: PropTypes.bool.isRequired,
  onRedo: PropTypes.func.isRequired
};

export default withNamespaces()(RedoButton);