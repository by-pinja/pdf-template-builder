import React from 'react';
import ReactDOM from 'react-dom';
import PdfTemplateBuilder from './PdfTemplateBuilder';

import './index.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

ReactDOM.render(
  <PdfTemplateBuilder innerRef={(ref) => {window.pdfTemplateBuilder = ref}}  />,
  document.getElementById('root')
);
