# What is this

[![Build Status](https://jenkins.protacon.cloud/buildStatus/icon?job=www.github.com/pdf-template-builder/master)](https://jenkins.protacon.cloud/job/www.github.com/job/pdf-template-builder/job/master/)

## Table of contents

* [What is this?](#what-is-this)
  * [Table of Contents](#table-of-contents)
* [Usage](#usage)
  * [Schema](#schema)
* [Development](#development)
  * [Requirements](#requirements)
  * [Getting started](#getting-started)

# Usage

The `pdf-template-builder` is designed to be used as a embedded tool inside other applications
communicating with the [pdf-storage](https://github.com/protacon/pdf-storage) service.

As a React component please use it like one.

```
import { PdfTemplateBuilder } from '@protacon/pdf-template-builder';

...

<PdfTemplateBuilder
    config={{}}                                   // page configuration
    template={{}}                                 // handled layout data
    language={navigator.language.split('-')[0]}   // en|fi
    onPreview={(html, baseData, options) => {}}   // callback, enables preview button
    onSave={(templateData, html) => {}}           // callback, enables save button
    schema={[]}                                   // allowed schema
/>
```

## Schema

Defining the schema allows you to embed mustache template tags to the output HTML.

```
// Define the schema
const schema = [
  {
      type: 'text',
      tag: 'date',
      text: 'Date',
      example: new Date().toLocaleDateString()
  }
];

...

// Use the schema
<PdfTemplateBuilder
    {...props}
    schema={schema}
/>
```

Configuration above allows you to bind tag `date` to the output 
template HTML which could for example be following (when simplified a lot).

```html
<html>
  <head>...</head>
  <body>
    <div>
      <span>{{date}}</span>    
    </div>
  </body>
</html>
```

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
