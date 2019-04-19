import React, { Component } from 'react';
import PdfTemplateBuilderContainer from '../Container/PdfTemplateBuilderContainer';
import Provider from 'react-redux/es/components/Provider';
import pdfTemplateBuilder from '../Store/reducers';
import { createStore } from 'redux';
import i18n from 'i18next';
import { loadFonts } from '../config';
import PropTypes from 'prop-types';

class PdfTemplateBuilder extends Component {
  ref = null;

  constructor(props) {
    super();
    
    this.store = createStore(
      pdfTemplateBuilder,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    this.state = {
      language: props.language || 'en',
      fonts: props.fonts,
      template: props.template,
      onPreview: props.onPreview,
      onSaveTemplate: props.onSaveTemplate,
    };
  }

  componentDidMount() {
    this.configure();
    this.changeLanguage();
    this.importTemplate();

    loadFonts(this.state.fonts);
  }

  componentWillReceiveProps(props) {
    if (props.language !== this.state.language) {
      this.setState({ language: props.language }, () => this.changeLanguage());
    }

    if (props.fonts !== this.state.fonts) {
      this.setState({ fonts: props.fonts }, () => loadFonts(this.state.fonts));
    }

    if (props.template !== this.state.template) {
      this.setState({ template: props.template }, () => this.importTemplate());
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <PdfTemplateBuilderContainer
          innerRef={ref => this.ref = ref} />
      </Provider>
    );
  }

  configure() {
    this.ref.configure({
      onPreview: this.state.onPreview,
      onSaveTemplate: this.state.onSaveTemplate,
    });
  }

  changeLanguage() {
    i18n.changeLanguage(this.state.language);
  }

  importTemplate() {
    if (this.state.template) {
      this.ref.importTemplate(this.state.template);
    }
  }
}

PdfTemplateBuilder.propTypes = {
  language: PropTypes.oneOf(['en', 'fi']),
  fonts: PropTypes.array,
  template: PropTypes.object,
  onPreview: PropTypes.func,
  onSaveTemplate: PropTypes.func
};

export default PdfTemplateBuilder;