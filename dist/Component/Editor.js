var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ElementToolsContainer from '../Container/ElementToolsContainer';
import Toolbox from './Toolbox';
import LayoutEditor from './LayoutEditor';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import ElementSpeedDialContainer from '../Container/ElementSpeedDialContainer';
import KeymasterContainer from '../Container/KeymasterContainer';

var styles = function styles(theme) {
  return {
    toolbox: {
      marginLeft: theme.spacing.unit * 2,
      width: 450,
      minWidth: 450
    },
    editorContainer: {
      background: theme.palette.background.default,
      borderRadius: 10,
      padding: 20,
      boxSizing: 'border-box',
      flex: 1,
      overflowX: 'auto'
    },
    editor: {
      fontFamily: 'Open Sans',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.5s ease, height 0.5s ease',
      transitionDelay: '0.2s',
      margin: 'auto'
    },
    container: {
      display: 'flex',
      position: 'relative'
    },
    loader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    header: { minHeight: 10, borderBottom: '15px solid #eee' },
    footer: { minHeight: 10, borderTop: '15px solid #eee' }
  };
};

var Editor = function (_Component) {
  _inherits(Editor, _Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _this.getComponentContent = _this.getComponentContent.bind(_this);
    _this.getGridBackground = _this.getGridBackground.bind(_this);
    return _this;
  }

  _createClass(Editor, [{
    key: 'getComponentContent',
    value: function getComponentContent(i) {
      var schema = this.props.schema;

      var meta = this.props.layout.root.find(function (e) {
        return e.i === i;
      }).meta;

      if (!meta || !meta.tag) {
        return {};
      }

      var prop = schema.find(function (prop) {
        return prop.tag === meta.tag;
      });

      if (!prop) {
        return {};
      }

      return {
        text: prop.example,
        tooltip: prop.text
      };
    }
  }, {
    key: 'getGridBackground',
    value: function getGridBackground() {
      if (!this.props.gridVisible) {
        return '';
      }

      var cellSize = 15;
      var cols = this.props.paperSize.width / cellSize;

      var content = Array.apply(null, { length: cols + 1 }).map(Number.call, Number).map(function (a, i) {
        return '<rect stroke=\'rgb(0, 0, 0, 0.03)\' stroke-width=\'1\' fill=\'none\' x=\'' + Math.round(0 / 2 + i * cellSize) + '\' y=\'' + 0 / 2 + '\' width=\'' + Math.round(cellSize) + '\' height=\'' + cellSize + '\'/>';
      }).join('');

      return 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + cellSize * cols + '\' height=\'' + cellSize + '\'>' + content + '</svg>")';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          editorLoading = _props.editorLoading,
          other = _objectWithoutProperties(_props, ['classes', 'editorLoading']);

      var editor = React.createElement(
        'div',
        { className: classes.loader },
        React.createElement(CircularProgress, { size: 100 })
      );

      if (!editorLoading) {
        editor = React.createElement(
          Paper,
          {
            id: 'editor',
            className: classes.editor,
            elevation: 1,
            style: {
              backgroundImage: this.getGridBackground(),
              minHeight: this.props.paperSize.height,
              width: this.props.paperSize.width
            }
          },
          React.createElement(
            'div',
            { id: 'pdf-template-header', className: classes.header },
            React.createElement(LayoutEditor, Object.assign({}, other, { parent: { i: 'header' }, layoutMode: 'relative' }))
          ),
          React.createElement(
            'div',
            { style: { flex: 1 } },
            React.createElement(LayoutEditor, Object.assign({}, other, { parent: { i: 'root' } }))
          ),
          React.createElement(
            'div',
            { id: 'pdf-template-footer', className: classes.footer },
            React.createElement(LayoutEditor, Object.assign({}, other, { parent: { i: 'footer' }, layoutMode: 'relative' }))
          )
        );
      }

      return React.createElement(
        'div',
        null,
        React.createElement(KeymasterContainer, null),
        React.createElement(Toolbox, null),
        React.createElement(ElementSpeedDialContainer, null),
        React.createElement(
          'div',
          { className: classes.container },
          React.createElement(
            'div',
            { className: classes.editorContainer },
            React.createElement(
              Paper,
              {
                id: 'editor',
                className: classes.editor,
                elevation: 1,
                style: {
                  backgroundImage: this.getGridBackground(),
                  minHeight: this.props.paperSize.height,
                  width: this.props.paperSize.width
                },
                onClick: function onClick() {
                  return _this2.props.onSelectElement(null);
                }
              },
              editor
            )
          ),
          React.createElement(
            'div',
            { className: classes.toolbox },
            React.createElement(ElementToolsContainer, null)
          )
        )
      );
    }
  }]);

  return Editor;
}(Component);

Editor.propTypes = {
  schema: PropTypes.array.isRequired,
  selectedUuid: PropTypes.string,
  layout: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  gridVisible: PropTypes.bool.isRequired,
  paperSize: PropTypes.object.isRequired,
  onSelectElement: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired
};

export default withStyles(styles)(Editor);