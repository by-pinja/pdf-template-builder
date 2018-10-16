var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AppBar from '@material-ui/core/AppBar/AppBar';
import PageToolsContainer from '../Container/PageToolsContainer';
import PreviewButtonContainer from '../Container/PreviewButtonContainer';
import React, { Component } from 'react';
import RedoButtonContainer from '../Container/RedoButtonContainer';
import SaveButtonContainer from '../Container/SaveButtonContainer';
import ToggleBordersContainer from '../Container/ToggleBordersContainer';
import ToggleGridButtonContainer from '../Container/ToggleGridButtonContainer';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import UndoButtonContainer from '../Container/UndoButtonContainer';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

var styles = function styles(theme) {
  return {
    bar: {
      marginBottom: theme.spacing.unit * 2
    },
    grow: {
      flexGrow: 1
    }
  };
};

var Toolbox = function (_Component) {
  _inherits(Toolbox, _Component);

  function Toolbox() {
    _classCallCheck(this, Toolbox);

    return _possibleConstructorReturn(this, (Toolbox.__proto__ || Object.getPrototypeOf(Toolbox)).apply(this, arguments));
  }

  _createClass(Toolbox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          t = _props.t;


      return React.createElement(
        AppBar,
        { position: 'static', className: classes.bar },
        React.createElement(
          Toolbar,
          null,
          React.createElement(
            Typography,
            { variant: 'title', color: 'inherit', className: classes.grow },
            t('pdfTemplateBuilder')
          ),
          React.createElement(PageToolsContainer, null),
          React.createElement(ToggleBordersContainer, null),
          React.createElement(ToggleGridButtonContainer, null),
          React.createElement(UndoButtonContainer, null),
          React.createElement(RedoButtonContainer, null),
          React.createElement(PreviewButtonContainer, null),
          React.createElement(SaveButtonContainer, null)
        )
      );
    }
  }]);

  return Toolbox;
}(Component);

export default withNamespaces()(withStyles(styles)(Toolbox));