var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Undo from '@material-ui/icons/Undo';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

var UndoButton = function (_Component) {
  _inherits(UndoButton, _Component);

  function UndoButton() {
    _classCallCheck(this, UndoButton);

    return _possibleConstructorReturn(this, (UndoButton.__proto__ || Object.getPrototypeOf(UndoButton)).apply(this, arguments));
  }

  _createClass(UndoButton, [{
    key: 'render',
    value: function render() {
      var t = this.props.t;


      return React.createElement(
        Tooltip,
        { title: t('doUndo') },
        React.createElement(
          'div',
          null,
          React.createElement(
            IconButton,
            {
              color: 'inherit',
              'aria-label': t('doUndo'),
              onClick: this.props.canUndo ? this.props.onUndo : undefined,
              disabled: !this.props.canUndo
            },
            React.createElement(Undo, null)
          )
        )
      );
    }
  }]);

  return UndoButton;
}(Component);

UndoButton.propTypes = {
  canUndo: PropTypes.bool.isRequired,
  onUndo: PropTypes.func.isRequired
};

export default withNamespaces()(UndoButton);