import React from 'react';
import ReactDOM from 'react-dom';
import PdfTemplateBuilderContainer from '../Container/PdfTemplateBuilderContainer';
import Provider from 'react-redux/es/components/Provider';
import pdfTemplateBuilder from '../reducers';
import { createStore } from 'redux';

class PdfTemplateBuilder {
  ref = null;

  constructor() {
    this.store = createStore(
      pdfTemplateBuilder,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  render(target = document.getElementById('root')) {
    ReactDOM.render(
      <Provider store={this.store}>
        <PdfTemplateBuilderContainer
          innerRef={ref => this.ref = ref} />
      </Provider>,
      target
    );
  }

  configure(config) {
    this.checkState() || this.ref.configure(config);
  }

  getTemplateHtml() {
    return this.checkState() || this.ref.getTemplateHtml();
  }

  exportTemplate() {
    return this.checkState() || this.ref.exportTemplate();
  }

  importTemplate(config) {
    this.checkState() || this.ref.importTemplate(config);
  }

  checkState() {
    if (!this.ref) {
      throw new Error(
        'Can\'t configure Pdf Template Generator before it has been rendered. ' +
        'Call PdfTemplateGenerator::render first'
      );
    }
  }
}

export default PdfTemplateBuilder;