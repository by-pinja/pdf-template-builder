class TemplateBuilder {
  static buildTemplate(layout) {
    const contents = layout
      .map(component => TemplateBuilder.getElementHtml(component))
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

  static getElementHtml(component) {
    const selector = '#component-' + component.i;
    const style    = window.getComputedStyle(document.querySelector(selector));
    const content = component.meta.tag ? `{{${component.meta.tag}}}` : component.meta.content;

    const textStyle = window.getComputedStyle(document.querySelector(selector + ' span'));

    let verticalAlign = '';

    if (component.meta.verticalAlignment === 'middle') {
      verticalAlign = '-webkit-transform: translateY(-50%)';
    }

    return `
        <div style='
          position: absolute;
          -webkit-transform: ${style.getPropertyValue('transform')}; /** Required for PhantomJS */
          width: ${style.getPropertyValue('width')};
          height: ${style.getPropertyValue('height')};
          font-size: ${style.getPropertyValue('font-size')};
          font-family: ${style.getPropertyValue('font-family')};
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        '>
          <span style='
            position: absolute;
            bottom: ${textStyle.getPropertyValue('bottom')}; 
            top: ${textStyle.getPropertyValue('top')}; 
            text-align: ${textStyle.getPropertyValue('text-align')};
            font-family: ${textStyle.getPropertyValue('font-family')};
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