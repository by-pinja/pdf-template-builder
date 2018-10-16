var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import GridLayout from 'react-grid-layout';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { capitalize } from '../Util/String';
import { defaults } from '../config';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

var styles = {
  element: {
    border: '1px solid transparent',
    overflow: 'hidden',
    transition: 'background-color 0.1s !important',
    '&:hover': {
      background: 'rgba(63, 81, 181, 0.3)',
      border: '1px dashed #007899'
    },
    '& > .react-resizable-handle': {
      display: 'none'
    }
  },
  transformHelpers: {
    border: '1px solid rgba(0, 0, 0, 0.1)'
  },
  selected: {
    border: '1px dashed #3f51b5',
    zIndex: 20,
    transition: 'none'
  }
};

var LayoutEditor = function (_Component) {
  _inherits(LayoutEditor, _Component);

  function LayoutEditor(props) {
    _classCallCheck(this, LayoutEditor);

    var _this = _possibleConstructorReturn(this, (LayoutEditor.__proto__ || Object.getPrototypeOf(LayoutEditor)).call(this, props));

    _this.getContent = _this.getContent.bind(_this);
    _this.getImage = _this.getImage.bind(_this);
    return _this;
  }

  _createClass(LayoutEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Required for nested elements to render properly
      this.forceUpdate();
    }
  }, {
    key: 'findProp',
    value: function findProp(schema, tag) {
      var o = null;

      schema.some(function iterator(a) {
        if (a.tag === tag) {
          o = a;
          return true;
        }

        return Array.isArray(a.items) && a.items.some(iterator);
      });

      return o;
    }
  }, {
    key: 'getContent',
    value: function getContent(i) {
      var _props = this.props,
          t = _props.t,
          layout = _props.layout,
          schema = _props.schema,
          parent = _props.parent;


      var meta = layout[parent.i].find(function (e) {
        return e.i === i;
      }).meta;

      if (meta && meta.tag) {
        // Handle tag
        var tag = this.findProp(schema, meta.tag.value);

        if (tag && tag.type === 'text') {
          var example = tag.example,
              text = tag.text;


          return {
            text: !example || (typeof example === 'undefined' ? 'undefined' : _typeof(example)) === _typeof([]) ? '' : example,
            tooltip: text
          };
        }
      }

      return meta.content ? { text: meta.content, tooltip: t('freeText') } : {};
    }
  }, {
    key: 'getImage',
    value: function getImage(i) {
      var _props2 = this.props,
          layout = _props2.layout,
          schema = _props2.schema,
          parent = _props2.parent;


      var meta = layout[parent.i].find(function (e) {
        return e.i === i;
      }).meta;
      var image = '';

      if (meta.image) {
        image = React.createElement('img', { alt: '', src: meta.image, style: { width: '100%' }, draggable: false });
      }

      if (meta.tag) {
        var tag = this.findProp(schema, meta.tag.value);

        if (tag.type === 'image') {
          image = React.createElement('img', { alt: '', src: tag.example, style: { width: '100%' }, draggable: false });
        }
      }

      return image;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var parentId = this.props.parent.i;
      var _props3 = this.props,
          classes = _props3.classes,
          bordersVisible = _props3.bordersVisible;


      if (!this.props.layout[parentId]) {
        return '';
      }

      var width = this.props.paperSize.width;
      var cellSize = 15;

      if (!['root', 'header', 'footer'].includes(parentId)) {
        var parentElement = document.querySelector('#component-' + parentId);

        if (!parentElement) {
          return '';
        }

        width = parentElement.offsetWidth;
      }

      var layout = this.props.layout[parentId];
      var cols = width / cellSize;

      var layoutMode = this.props.layoutMode;

      if (!layoutMode) {
        if (['root', 'header', 'footer'].includes(parentId)) {
          layoutMode = this.props.page.layoutRelative ? 'relative' : 'absolute';
        } else {
          layoutMode = this.props.parent.meta.layoutRelative ? 'relative' : 'absolute';
        }
      }

      return React.createElement(
        GridLayout,
        {
          layout: layout,
          cols: width / cellSize,
          rowHeight: cellSize,
          width: width,
          maxRows: this.props.parent.h,
          containerPadding: [0, 0],
          isDraggable: parentId === this.props.selectedGroupId,
          margin: [0, 0],
          compactType: layoutMode === 'absolute' ? null : 'vertical',
          preventCollision: layoutMode === 'absolute',
          onLayoutChange: function onLayoutChange(layout) {
            return _this2.props.onChangeLayout(layout, parentId);
          }
        },
        layout.map(function (e) {
          var className = _this2.props.selectedUuid === e.i ? classes.selected : classes.element;

          bordersVisible && (className += ' ' + classes.transformHelpers);

          var content = _this2.getContent(e.i);
          var meta = e.meta;


          var fontStyle = meta.fontStyle || [];

          var textStyle = {
            position: 'absolute',
            textAlign: meta.horizontalAlignment,
            width: '100%',
            fontFamily: meta.fontFamily,
            fontSize: Number(meta.fontSize || 16),
            color: meta.color,
            fontStyle: fontStyle.includes('italic') ? 'italic' : null,
            fontWeight: fontStyle.includes('bold') ? 'bold' : 'normal',
            textDecoration: fontStyle.includes('underline') ? 'underline' : null
          };

          var containerStyle = {
            boxSizing: 'border-box',
            width: '100%',
            height: '100%'
          };

          var borderWidth = meta.borderWidth || defaults.border.width;
          var borderColor = meta.borderColor || defaults.border.color;

          (meta.border || []).forEach(function (border) {
            return containerStyle['border' + capitalize(border)] = borderWidth + 'px solid ' + borderColor;
          });

          if (meta.verticalAlignment === 'middle') {
            textStyle.top = '50%';
            textStyle.transform = 'translateY(-50%)';
          } else if (meta.verticalAlignment === 'bottom') {
            textStyle.bottom = 0;
          }

          if (layoutMode === 'relative') {
            e.w = cols;
            e.minW = cols;
          } else {
            delete e.minW;
          }

          return React.createElement(
            'div',
            {
              id: 'component-' + e.i,
              className: className,
              key: e.i,
              'data-grid': e,
              onClick: function onClick(event) {
                return event.stopPropagation() || _this2.props.onSelectElement(e.i);
              },
              onDragEnd: function onDragEnd(e) {
                return e.stopPropagation();
              },
              style: containerStyle
            },
            React.createElement(
              Tooltip,
              { title: content.tooltip || '' },
              React.createElement(
                'span',
                { style: textStyle },
                content.text,
                _this2.getImage(e.i)
              )
            ),
            React.createElement(LayoutEditor, Object.assign({}, _this2.props, { parent: e, layoutMode: null }))
          );
        })
      );
    }
  }]);

  return LayoutEditor;
}(Component);

LayoutEditor.propTypes = {
  schema: PropTypes.array.isRequired,
  bordersVisible: PropTypes.bool.isRequired,
  layout: PropTypes.object.isRequired,
  layoutMode: PropTypes.string,
  onChangeLayout: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired,
  onDoConfigure: PropTypes.func.isRequired,
  onSelectElement: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  selectedUuid: PropTypes.string
};

export default withNamespaces()(withStyles(styles)(LayoutEditor));