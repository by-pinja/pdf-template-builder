# What is this

[![npm version](https://badge.fury.io/js/%40protacon%2Fpdf-template-builder.svg)](https://badge.fury.io/js/%40protacon%2Fpdf-template-builder)
[![Build Status](https://jenkins.protacon.cloud/buildStatus/icon?job=www.github.com/pdf-template-builder/master)](https://jenkins.protacon.cloud/job/www.github.com/job/pdf-template-builder/job/master/)

Template builder for [pdf-storage](https://github.com/protacon/pdf-storage)

## Table of contents

* [What is this?](#what-is-this)
  * [Table of Contents](#table-of-contents)
* [Usage](#usage)
  * [Public API](#public-api)
* [Development](#development)
  * [Requirements](#requirements)
  * [Getting started](#getting-started)

# Usage

The `pdf-template-builder` is designed to be used as a embedded tool inside other applications
communicating with the [pdf-storage](https://github.com/protacon/pdf-storage) service. This repo contains the builder as a 
pure React component which can be used in React app in React way. 

**See working example with full configuration at https://github.com/protacon/how-to-react-pdf-template-builder**

1. Install module
```bash
npm i @protacon/pdf-template-builder
```

2. Require it in your app
```jsx
import PdfTemplateBuilder from '@protacon/pdf-template-builder';
```

3. Use the component

```jsx
<PdfTemplateBuilder
  language={this.state.language}
  template={this.state.template}
  schema={new Schema().forExample()}
  onPreview={this.handlePreview}
  onSaveTemplate={this.handleSave}
/>
```

# Configuration

## Language (string, optional)

Embedded builder language. Supported options are `en` and `fi`. Defaults to `en`.

## Template (object, optional)

Template you want to modify. This template object should be in proper template object format. Absolutely best way to create one is to save template from the builder and take object from that output. Defaults to `undefined` which means we are creating a new template.

## Schema (array, optional)

The object configuration which allows you to configure certain keys to be binded to the template. For example you may want to bind invoice's number to the invoice, so you configure a schema object with key `invoiceNumber` which you can bind to certain element in your template. Later template will be populated using the proper invoice data and the `invoiceNumber` placeholder will be filled up with the invoice's number. Defaults to empty array.

```js
[
  {
    type: 'text|group|image',
    tag: 'invoiceNumber',
    text: 'Invoice Number',
    example: '12345'
  }
]
```

## onPreview (function, optional)

Enables the preview button to the builder. When preview button is clicked, the callback defined will be called with the `templateHtml`, `templateData` and `pageOptions` parameters which you can utilize in any way you want, usually just create a preview of the PDF using these parameters. Parameters are straightly compatible with the pdf-storage API. Defaults to `undefined`, no preview button is shown.

```
...
onPreview={(templateHtml, templateData, pageOptions) => console.log(templateHtml, templateData, pageOptions))}
...
```

## onSaveTemplate (function, optional)

Enables the save button to the builder. When save button is clicked, the callback defined will be called with the `template` and `templateHtml` parameters. Using the `template` object the builder can be repopulated and the template can be opened under edit again later. Maybe store the `template` as JSON string to database? Defaults to `undefined`, no save button is shown.

# Development

## Requirements

You'd better to have [node.js](https://nodejs.org/en/) installed.

## Getting started

To get started with the development run following commands

```
npm install
npm start
```

and navigate to the `http://localhost:3000` with your favourite browser.