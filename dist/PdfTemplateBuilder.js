var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import './i18n';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import pdfTemplateBuilder from './Store/reducers';
import PropTypes from 'prop-types';
import Provider from 'react-redux/es/components/Provider';
import React, { Component } from 'react';
import Wrapper from './Wrapper';
import { createStore } from 'redux';

var PdfTemplateBuilder = function (_Component) {
  _inherits(PdfTemplateBuilder, _Component);

  function PdfTemplateBuilder(props) {
    _classCallCheck(this, PdfTemplateBuilder);

    var _this = _possibleConstructorReturn(this, (PdfTemplateBuilder.__proto__ || Object.getPrototypeOf(PdfTemplateBuilder)).call(this, props));

    var devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    _this.store = createStore(pdfTemplateBuilder, props.disableReduxDevTools ? undefined : devTools);
    return _this;
  }

  _createClass(PdfTemplateBuilder, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        Provider,
        { store: this.store },
        React.createElement(Wrapper, this.props)
      );
    }
  }]);

  return PdfTemplateBuilder;
}(Component);

PdfTemplateBuilder.propTypes = {
  config: PropTypes.object.isRequired,
  disableReduxDevTools: PropTypes.object,
  language: PropTypes.oneOf(['en', 'fi']),
  onPreview: PropTypes.func,
  onSave: PropTypes.func,
  schema: PropTypes.array,
  template: PropTypes.object
};

export default PdfTemplateBuilder;