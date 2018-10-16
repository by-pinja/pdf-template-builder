import './i18n';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import React, { Component } from 'react';
import Provider from 'react-redux/es/components/Provider';
import PdfTemplateProvider from './Provider';
import pdfTemplateBuilder from './Store/reducers';
import { createStore } from 'redux';
import PropTypes from 'prop-types';

class PdfTemplateBuilder extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(
      pdfTemplateBuilder,
      props.disableReduxDevTools ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <PdfTemplateProvider {...this.props} />
      </Provider>
    );
  }
}

PdfTemplateBuilder.propTypes = {
  schema: PropTypes.array,
  config: PropTypes.object.isRequired,
  disableReduxDevTools: PropTypes.object,
  language: PropTypes.oneOf(['en', 'fi']),
  onSave: PropTypes.func,
  onPreview: PropTypes.func,
  template: PropTypes.object,
};

export default PdfTemplateBuilder;