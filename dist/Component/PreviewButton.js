var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

var PreviewButton = function (_Component) {
  _inherits(PreviewButton, _Component);

  function PreviewButton() {
    _classCallCheck(this, PreviewButton);

    return _possibleConstructorReturn(this, (PreviewButton.__proto__ || Object.getPrototypeOf(PreviewButton)).apply(this, arguments));
  }

  _createClass(PreviewButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          t = _props.t,
          onPreview = _props.onPreview,
          templateData = _props.templateData,
          templateHtml = _props.templateHtml,
          exportTemplate = _props.exportTemplate;


      if (!onPreview) {
        return '';
      }

      return React.createElement(
        Tooltip,
        { title: t('showPreview') },
        React.createElement(
          IconButton,
          {
            color: 'inherit',
            'aria-label': t('showPreview'),
            onClick: function onClick() {
              return onPreview(templateHtml(), templateData, exportTemplate().options);
            }
          },
          React.createElement(RemoveRedEye, null)
        )
      );
    }
  }]);

  return PreviewButton;
}(Component);

PreviewButton.propTypes = {
  onPreview: PropTypes.func,
  templateHtml: PropTypes.func.isRequired,
  templateData: PropTypes.object.isRequired,
  exportTemplate: PropTypes.func.isRequired
};

export default withNamespaces()(PreviewButton);