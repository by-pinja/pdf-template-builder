import PdfTemplateBuilder from './Resource/PdfTemplateBuilder';

import './index.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Schema from './Resource/Schema';

if (process.env.REACT_APP_MODE === 'standalone') {
  const builder = new PdfTemplateBuilder();

  builder.render();

  builder.configure({
    onSaveTemplate: () => localStorage.setItem('layout', JSON.stringify(builder.exportTemplate())),
    schema: new Schema().forExample()
  });

  try {
    const layout = JSON.parse(localStorage.getItem('layout'));
    builder.importTemplate(layout);
  } catch(e) {
    // Silence
  }
} else {
  window.PdfTemplateBuilder = PdfTemplateBuilder;
}
