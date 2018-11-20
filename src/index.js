import 'core-js/fn/array/includes';
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';

import PdfTemplateBuilder from './Resource/PdfTemplateBuilder';

import './i18n';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Schema from './Resource/Schema';

if (process.env.REACT_APP_MODE === 'standalone') {
  const builder = new PdfTemplateBuilder();

  builder.render();

  const config = {
    onSaveTemplate: () => localStorage.setItem('layout', JSON.stringify(builder.exportTemplate())),
    schema: new Schema().forExample(),
  };

  // TODO: do this in the standalone app
  if (process.env.REACT_APP_PDF_STORAGE_URI) {
    config.onPreview = (html, baseData, options) => {
      fetch(process.env.REACT_APP_PDF_STORAGE_URI, {
        method: 'POST',
        headers: {
          Authorization: 'ApiKey apikeyfortesting',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          html,
          baseData,
          options,
          rowData: [{}],
        })
      })
        .then(res => res.json())
        .then(res => {
          window.open(res[0].pdfUri, '_blank');
        })
      ;
    }
  }

  builder.configure(config);

  try {
    const layout = JSON.parse(localStorage.getItem('layout'));
    builder.importTemplate(layout);
  } catch(e) {
    // Silence
  }

  window.builder = builder;
} else {
  window.PdfTemplateBuilder = PdfTemplateBuilder;
}
