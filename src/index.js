import React from 'react';
import ReactDOM from 'react-dom';
import PdfTemplateBuilderContainer from './Container/PdfTemplateBuilderContainer';
import { createStore } from 'redux';
import Provider from 'react-redux/es/components/Provider';
import pdfTemplateBuilder from './reducers';

import './index.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const store = createStore(
  pdfTemplateBuilder,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <PdfTemplateBuilderContainer innerRef={(ref) => {window.pdfTemplateBuilder = ref}}  />
  </Provider>,
  document.getElementById('root')
);
