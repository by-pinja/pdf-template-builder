import {defaults} from '../config';

class TemplateBuilder {
  static buildTemplate(layout, page, schema, root = 'root', onlyElement = false) {
    const contents = layout[root]
      .sort((a, b) => a.y > b.y ? 1 : -1)
      .map(component => this.getElementHtml(component, page, layout, schema))
      .join('');

    if (onlyElement) {
      return contents;
    }

    const header = this.buildTemplate(layout, page, schema, 'header', true);
    const footer = this.buildTemplate(layout, page, schema, 'footer', true);

    return `
      <html>
        ${this.getHead(layout)}
        
        <!-- Include header and footer in the html to support templating -->
        <div id="pageHeader">${header}</div>
        <div id="pageFooter">${footer}</div>
        
        ${this.getBody(contents)}
      </html>
    `;
  }

  static getHead(layout) {
    const fonts = this.getUsedFonts(layout).map(font => font.replace(' ', '+')).join('|');

    return `
      <head>
        <link href="https://fonts.googleapis.com/css?family=${fonts}" rel="stylesheet">
        <style>
          * { font-family: "Arial", sans-serif }
          html, body {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
    `;
  }

  static getBody(contents) {
    return `
      <body>
        <div style="position: relative;">
          ${contents}
        </div>
      </body>
    `;
  }

  static getElementHtml(component, page, layout, schema, parent) {
    const selector = '#component-' + component.i;
    const style    = window.getComputedStyle(document.querySelector(selector));
    const content = this.getComponentContent(component, page, layout, schema);

    let styles = '';
    let position = 'absolute';

    if (!parent) {
      position = page.layoutRelative ? 'relative' : position;
    } else {
      position = parent.meta.layoutRelative ? 'relative' : position;
    }

    if (position === 'absolute') {
      styles += `
        -webkit-transform: ${style.getPropertyValue('transform')}; /** Required for PhantomJS */ 
        height: ${style.getPropertyValue('height')};
        overflow: hidden;
      `;
    } else if (position === 'relative') {
      styles += `
        display: block; 
        min-height: ${style.getPropertyValue('height')};
      `;
    }

    const borderWidth = component.meta.borderWidth || defaults.border.width;
    const borderColor = component.meta.borderColor || defaults.border.color;

    (component.meta.border || [])
      .forEach(border => styles += `border-${border}: ${borderWidth}px solid ${borderColor};`)
    ;

    let start = '';
    let end   = '';
    let image = `<img src="${component.meta.image}" style="width: 100%; display: block; page-break-inside: avoid;"/>`;

    if (component.meta.tag) {
      const tag = this.findSchemaProp(schema, component.meta.tag.value);

      if (tag && tag.type === 'group') {
        start = `{{#${tag.tag}}}`;
        end   = `{{/${tag.tag}}}`;
      }

      if (tag && tag.type === 'image') {
        image = `<img src="{{${tag.tag}}}" style="width: 100%; display: block; page-break-inside: avoid;"/>`;
      }
    }

    return `
        ${start}
        <div style='
          position: ${position};
          ${styles}
          width: ${style.getPropertyValue('width')};
          font-size: ${style.getPropertyValue('font-size')};
          font-family: ${style.getPropertyValue('font-family')};
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          display: block;
          page-break-inside: avoid;
          page-break-after: auto;
          page-break-before: auto;
        '>
          ${content}
          ${image}
        </div>
        ${end}
      `;
  }

  static getComponentContent(component, page, layout, schema) {
    const children = (layout[component.i] || [])
      .sort((a, b) => a.y > b.y ? 1 : -1)
      .map(
      element => this.getElementHtml(element, page, layout, schema, component)
    ).join('') || '';

    if (!component.meta.tag) {
      return this.createTextBlock(component, component.meta.content) + children;
    }

    const tag = this.findSchemaProp(schema, component.meta.tag.value);

    if (tag.type === 'text') {
      return this.createTextBlock(component, `{{${tag.tag}}}`) + children;
    }

    if (tag.type === 'group') {
     return children;
    }

    return '';
  }

  static createTextBlock(component, content) {
    if (!content) {
      return '';
    }

    const textStyle = window.getComputedStyle(
      document.querySelector(`#component-${component.i} span`)
    );

    let verticalAlign = '';

    if (component.meta.verticalAlignment === 'middle') {
      verticalAlign = '-webkit-transform: translateY(-50%);';
    }

    const fontStyles = component.meta.fontStyle || [];
    let textDecoration = 'none';
    let fontWeight = '400';
    let fontStyle = 'none';

    if (fontStyles.includes('bold')) {
      fontWeight = 'bold';
    }

    if (fontStyles.includes('underline')) {
      textDecoration = 'underline';
    }

    if (fontStyles.includes('italic')) {
      fontStyle = 'italic';
    }

    return `
      <span style='
        position: relative;
        display: block;
        bottom: ${textStyle.getPropertyValue('bottom')}; 
        top: ${textStyle.getPropertyValue('top')}; 
        text-align: ${textStyle.getPropertyValue('text-align')};
        font-family: ${textStyle.getPropertyValue('font-family')};
        font-size: ${textStyle.getPropertyValue('font-size')};
        color: ${textStyle.getPropertyValue('color')};
        line-height: ${textStyle.getPropertyValue('line-height')};
        white-space: pre-line;
        width: 100%;
        font-style: ${fontStyle};
        text-decoration: ${textDecoration};
        font-weight: ${fontWeight};
        ${verticalAlign}
      '>${content}</span>
    `;
  }

  static getUsedFonts(layout) {
    const fonts = [];

    Object.keys(layout).forEach(groupId => {
      return layout[groupId].forEach(e => {
        // TODO: Optimize - load different sizes and italic versions only if used in the layout
        !fonts.includes(e.meta.fontFamily) && fonts.push(e.meta.fontFamily + ':400,400i,700,700i');
      })
    });

    return fonts;
  }

  static findSchemaProp(schema, tag) {
    let o = null;

    schema.some(function iterator(a) {
      if (a.tag === tag) {
        o = a;
        return true;
      }

      return Array.isArray(a.items) && a.items.some(iterator);
    });

    return o;
  }
}

export default TemplateBuilder;