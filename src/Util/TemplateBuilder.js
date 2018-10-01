class TemplateBuilder {
  static buildTemplate(layout, page) {
    const contents = layout
      .map(component => TemplateBuilder.getElementHtml(component, page))
      .join('');

    return `
      <html>
        ${TemplateBuilder.getHead(layout)}
        ${TemplateBuilder.getBody(contents)}
      </html>
    `;
  }

  static getHead(layout) {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    const fonts = layout.map(c => (c.meta.fontFamily || 'Open Sans').replace(' ', '+')).filter(onlyUnique).join('|');

    return `
      <head>
        <link href="https://fonts.googleapis.com/css?family=${fonts}" rel="stylesheet">
        <style>
          * { font-family: "Open Sans", sans-serif }
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

  static getElementHtml(component, page) {
    const selector = '#component-' + component.i;
    const style    = window.getComputedStyle(document.querySelector(selector));
    const content = component.meta.tag ? `{{${component.meta.tag}}}` : component.meta.content;

    const textStyle = window.getComputedStyle(document.querySelector(selector + ' span'));

    let verticalAlign = '';

    if (component.meta.verticalAlignment === 'middle') {
      verticalAlign = '-webkit-transform: translateY(-50%)';
    }

    const parent = component.meta.parent || 'root';

    let styles = '';
    let position = 'absolute';

    if (parent === 'root') {
      position = page.layoutRelative ? 'relative' : 'absolute';
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

    return `
        <div style='
          position: ${position};
          ${styles}
          width: ${style.getPropertyValue('width')};
          font-size: ${style.getPropertyValue('font-size')};
          font-family: ${style.getPropertyValue('font-family')};
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          border: 1px solid;
        '>
          <span style='
            position: relative;
            display: block;
            bottom: ${textStyle.getPropertyValue('bottom')}; 
            top: ${textStyle.getPropertyValue('top')}; 
            text-align: ${textStyle.getPropertyValue('text-align')};
            font-family: ${textStyle.getPropertyValue('font-family')};
            font-size: ${textStyle.getPropertyValue('font-size')};
            width: 100%;
            ${verticalAlign}
          '>
            ${content}
          </span>
        </div>
      `;
  }
}

export default TemplateBuilder;