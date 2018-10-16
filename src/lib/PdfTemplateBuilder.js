import './i18n';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import pdfTemplateBuilder from './Store/reducers';
import PropTypes from 'prop-types';
import Provider from 'react-redux/es/components/Provider';
import React, { Component } from 'react';
import Wrapper from './Wrapper';
import { createStore } from 'redux';

class PdfTemplateBuilder extends Component {
  constructor(props) {
    super(props);

    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    this.store = createStore(
      pdfTemplateBuilder,
      props.disableReduxDevTools ? undefined : devTools
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <Wrapper {...this.props} />
      </Provider>
    );
  }
}

PdfTemplateBuilder.propTypes = {
  config: PropTypes.object.isRequired,
  disableReduxDevTools: PropTypes.object,
  language: PropTypes.oneOf(['en', 'fi']),
  onPreview: PropTypes.func,
  onSave: PropTypes.func,
  schema: PropTypes.array,
  template: PropTypes.object,
};

export default PdfTemplateBuilder;