var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { defaults } from '../config';

var TemplateBuilder = function () {
  function TemplateBuilder() {
    _classCallCheck(this, TemplateBuilder);
  }

  _createClass(TemplateBuilder, null, [{
    key: 'buildTemplate',
    value: function buildTemplate(layout, page, schema) {
      var _this = this;

      var root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'root';
      var onlyElement = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var contents = layout[root].sort(function (a, b) {
        return a.y > b.y ? 1 : -1;
      }).map(function (component) {
        return _this.getElementHtml(component, page, layout, schema);
      }).join('');

      if (onlyElement) {
        return contents;
      }

      var header = this.buildTemplate(layout, page, schema, 'header', true);
      var footer = this.buildTemplate(layout, page, schema, 'footer', true);

      return '\n      <html>\n        ' + this.getHead(layout) + '\n        \n        <!-- Include header and footer in the html to support templating -->\n        <div id="pageHeader">' + header + '</div>\n        <div id="pageFooter">' + footer + '</div>\n        \n        ' + this.getBody(contents) + '\n      </html>\n    ';
    }
  }, {
    key: 'getHead',
    value: function getHead(layout) {
      var fonts = this.getUsedFonts(layout).map(function (font) {
        return font.replace(' ', '+');
      }).join('|');

      return '\n      <head>\n        <link href="https://fonts.googleapis.com/css?family=' + fonts + '" rel="stylesheet">\n        <style>\n          * { font-family: "Open Sans", sans-serif }\n          html, body {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n          }\n        </style>\n      </head>\n    ';
    }
  }, {
    key: 'getBody',
    value: function getBody(contents) {
      return '\n      <body>\n        <div style="position: relative;">\n          ' + contents + '\n        </div>\n      </body>\n    ';
    }
  }, {
    key: 'getElementHtml',
    value: function getElementHtml(component, page, layout, schema, parent) {
      var selector = '#component-' + component.i;
      var style = window.getComputedStyle(document.querySelector(selector));
      var content = this.getComponentContent(component, page, layout, schema);

      var styles = '';
      var position = 'absolute';

      if (!parent) {
        position = page.layoutRelative ? 'relative' : position;
      } else {
        position = parent.meta.layoutRelative ? 'relative' : position;
      }

      if (position === 'absolute') {
        styles += '\n        -webkit-transform: ' + style.getPropertyValue('transform') + '; /** Required for PhantomJS */ \n        height: ' + style.getPropertyValue('height') + ';\n        overflow: hidden;\n      ';
      } else if (position === 'relative') {
        styles += '\n        display: block; \n        min-height: ' + style.getPropertyValue('height') + ';\n      ';
      }

      var borderWidth = component.meta.borderWidth || defaults.border.width;
      var borderColor = component.meta.borderColor || defaults.border.color;

      (component.meta.border || []).forEach(function (border) {
        return styles += 'border-' + border + ': ' + borderWidth + 'px solid ' + borderColor + ';';
      });

      var start = '';
      var end = '';
      var image = '<img src="' + component.meta.image + '" style="width: 100%; display: block; page-break-inside: avoid;"/>';

      if (component.meta.tag) {
        var tag = this.findSchemaProp(schema, component.meta.tag.value);

        if (tag && tag.type === 'group') {
          start = '{{#' + tag.tag + '}}';
          end = '{{/' + tag.tag + '}}';
        }

        if (tag && tag.type === 'image') {
          image = '<img src="{{' + tag.tag + '}}" style="width: 100%; display: block; page-break-inside: avoid;"/>';
        }
      }

      return '\n        ' + start + '\n        <div style=\'\n          position: ' + position + ';\n          ' + styles + '\n          width: ' + style.getPropertyValue('width') + ';\n          font-size: ' + style.getPropertyValue('font-size') + ';\n          font-family: ' + style.getPropertyValue('font-family') + ';\n          box-sizing: border-box;\n          padding: 0;\n          margin: 0;\n          display: block;\n          page-break-inside: avoid;\n          page-break-after: auto;\n          page-break-before: auto;\n        \'>\n          ' + content + '\n          ' + image + '\n        </div>\n        ' + end + '\n      ';
    }
  }, {
    key: 'getComponentContent',
    value: function getComponentContent(component, page, layout, schema) {
      var _this2 = this;

      var children = (layout[component.i] || []).sort(function (a, b) {
        return a.y > b.y ? 1 : -1;
      }).map(function (element) {
        return _this2.getElementHtml(element, page, layout, schema, component);
      }).join('') || '';

      if (!component.meta.tag) {
        return this.createTextBlock(component, component.meta.content) + children;
      }

      var tag = this.findSchemaProp(schema, component.meta.tag.value);

      if (tag.type === 'text') {
        return this.createTextBlock(component, '{{' + tag.tag + '}}') + children;
      }

      if (tag.type === 'group') {
        return children;
      }

      return '';
    }
  }, {
    key: 'createTextBlock',
    value: function createTextBlock(component, content) {
      if (!content) {
        return '';
      }

      var textStyle = window.getComputedStyle(document.querySelector('#component-' + component.i + ' span'));

      var verticalAlign = '';

      if (component.meta.verticalAlignment === 'middle') {
        verticalAlign = '-webkit-transform: translateY(-50%);';
      }

      var fontStyles = component.meta.fontStyle || [];
      var textDecoration = 'none';
      var fontWeight = '400';
      var fontStyle = 'none';

      if (fontStyles.includes('bold')) {
        fontWeight = 'bold';
      }

      if (fontStyles.includes('underline')) {
        textDecoration = 'underline';
      }

      if (fontStyles.includes('italic')) {
        fontStyle = 'italic';
      }

      return '\n      <span style=\'\n        position: relative;\n        display: block;\n        bottom: ' + textStyle.getPropertyValue('bottom') + '; \n        top: ' + textStyle.getPropertyValue('top') + '; \n        text-align: ' + textStyle.getPropertyValue('text-align') + ';\n        font-family: ' + textStyle.getPropertyValue('font-family') + ';\n        font-size: ' + textStyle.getPropertyValue('font-size') + ';\n        color: ' + textStyle.getPropertyValue('color') + ';\n        width: 100%;\n        font-style: ' + fontStyle + ';\n        text-decoration: ' + textDecoration + ';\n        font-weight: ' + fontWeight + ';\n        ' + verticalAlign + '\n      \'>\n        ' + content + '\n      </span>\n    ';
    }
  }, {
    key: 'getUsedFonts',
    value: function getUsedFonts(layout) {
      var fonts = [];

      Object.keys(layout).forEach(function (groupId) {
        return layout[groupId].forEach(function (e) {
          // TODO: Optimize - load different sizes and italic versions only if used in the layout
          !fonts.includes(e.meta.fontFamily) && fonts.push(e.meta.fontFamily + ':400,400i,700,700i');
        });
      });

      return fonts;
    }
  }, {
    key: 'findSchemaProp',
    value: function findSchemaProp(schema, tag) {
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
  }]);

  return TemplateBuilder;
}();

export default TemplateBuilder;