import React from 'react';
import ReactDOM from 'react-dom';
import { PdfTemplateBuilder } from './lib';
import Schema from './lib/Resource/Schema';

const handlePreview = (html, baseData, options) => {
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
};

const handleSave = template => localStorage.setItem('template', JSON.stringify(template));

let template = null;

try {
  template = JSON.parse(localStorage.getItem('template'));
} catch(e) {
  // Silence
}

ReactDOM.render(
  <PdfTemplateBuilder
    config={{}}
    template={template}
    language={navigator.language.split('-')[0]}
    onPreview={handlePreview}
    onSave={handleSave}
    schema={new Schema().forExample()}
  />,
  document.getElementById('root')
);
