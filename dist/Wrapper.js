var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorContainer from './Container/EditorContainer';
import { configure, importTemplate, selectElement, setEditorLoading } from './Store/actions';
import i18n from 'i18next';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

var Wrapper = function (_Component) {
  _inherits(Wrapper, _Component);

  function Wrapper() {
    _classCallCheck(this, Wrapper);

    return _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).apply(this, arguments));
  }

  _createClass(Wrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleProps();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.handleProps(props);
    }
  }, {
    key: 'handleProps',
    value: function handleProps() {
      var newProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _props$newProps = Object.assign({}, this.props, newProps),
          onSave = _props$newProps.onSave,
          onPreview = _props$newProps.onPreview,
          language = _props$newProps.language,
          schema = _props$newProps.schema,
          onDoConfigure = _props$newProps.onDoConfigure,
          onImportTemplate = _props$newProps.onImportTemplate,
          template = _props$newProps.template;

      onDoConfigure({ onSaveTemplate: onSave, onPreview: onPreview, schema: schema });

      if (template && this.props.template !== newProps.template) {
        onImportTemplate(template);
      }

      i18n.changeLanguage(language);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(EditorContainer, null);
    }
  }]);

  return Wrapper;
}(Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onDoConfigure: function onDoConfigure(config) {
      return dispatch(configure(config));
    },
    onImportTemplate: function onImportTemplate(template) {
      // Set editor loading while 'importing' the template
      dispatch(setEditorLoading(true));
      setTimeout(function () {
        return dispatch(setEditorLoading(false));
      }, 1000);

      dispatch(selectElement(null));
      dispatch(importTemplate(template));
      dispatch(UndoActionCreators.clearHistory());
    }
  };
};

export default connect(null, mapDispatchToProps)(Wrapper);