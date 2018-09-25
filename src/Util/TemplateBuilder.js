class TemplateBuilder {
  static buildTemplate(layout, meta) {
    const contents = layout
      .map(component => TemplateBuilder.getElementHtml(component, meta))
      .join('');

    return `
      <html>
        ${TemplateBuilder.getHead()}
        ${TemplateBuilder.getBody(contents)}
      </html>
    `;
  }

  static getHead() {
    return `
      <head>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
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

  static getElementHtml(component, meta) {
    const selector = '#component-' + component.i;
    const style    = window.getComputedStyle(document.querySelector(selector));
    const content = meta[component.i].tag ? `{{${meta[component.i].tag}}}` : meta[component.i].content;

    return `
        <div style='
          position: absolute;
          -webkit-transform: ${style.getPropertyValue('transform')}; /** Required for PhantomJS */
          width: ${style.getPropertyValue('width')};
          height: ${style.getPropertyValue('height')};
          font-size: ${style.getPropertyValue('font-size')};
          font-family: ${style.getPropertyValue('font-family')};
          box-sizing: border-box;
          padding: 5px;
        '>
          ${content}
        </div>
      `;
  }

}

export default TemplateBuilder;