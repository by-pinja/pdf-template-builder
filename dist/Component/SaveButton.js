var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Save from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

var SaveButton = function (_Component) {
  _inherits(SaveButton, _Component);

  function SaveButton(props) {
    _classCallCheck(this, SaveButton);

    var _this = _possibleConstructorReturn(this, (SaveButton.__proto__ || Object.getPrototypeOf(SaveButton)).call(this, props));

    _this.handleSave = _this.handleSave.bind(_this);
    return _this;
  }

  _createClass(SaveButton, [{
    key: 'handleSave',
    value: function handleSave() {
      var _props = this.props,
          onSaveTemplate = _props.onSaveTemplate,
          exportTemplate = _props.exportTemplate,
          getTemplateHtml = _props.getTemplateHtml;


      onSaveTemplate(exportTemplate(), getTemplateHtml());
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.onSaveTemplate) {
        return '';
      }

      var t = this.props.t;


      return React.createElement(
        Tooltip,
        { title: t('doSave') },
        React.createElement(
          'div',
          null,
          React.createElement(
            IconButton,
            {
              color: 'inherit',
              'aria-label': t('doSave'),
              onClick: this.handleSave
            },
            React.createElement(Save, null)
          )
        )
      );
    }
  }]);

  return SaveButton;
}(Component);

SaveButton.propTypes = {
  onSaveTemplate: PropTypes.func,
  exportTemplate: PropTypes.func,
  getTemplateHtml: PropTypes.func
};

export default withNamespaces()(SaveButton);