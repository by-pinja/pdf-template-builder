import PdfTemplateBuilder from './Resource/PdfTemplateBuilder';

import './index.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

if (process.env.REACT_APP_MODE === 'standalone') {
  const builder = new PdfTemplateBuilder();

  builder.render();
} else {
  window.PdfTemplateBuilder = PdfTemplateBuilder;
}
