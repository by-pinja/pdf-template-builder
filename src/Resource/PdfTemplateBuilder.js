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
      fonts: props.fonts || null
    };

    loadFonts(this.state.fonts);
    this.changeLanguage();
  }

  componentWillReceiveProps(props) {
    if (props.language !== this.state.language) {
      this.setState({ language: props.language }, () => this.changeLanguage());
    }

    if (props.fonts !== this.state.fonts) {
      this.setState({ fonts: props.fonts }, () => loadFonts(this.state.fonts));
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <PdfTemplateBuilderContainer
          innerRef={ref => this.ref = ref} />
      </Provider>
    )
  }

  /*
  configure(config) {
    this.checkState() || this.ref.configure(config);

    config.language && this.changeLanguage(config.language);
  }

  getTemplateHtml() {
    return this.checkState() || this.ref.getTemplateHtml();
  }

  exportTemplate() {
    return this.checkState() || this.ref.exportTemplate();
  }

  importTemplate(config) {
    this.checkState() || this.ref.importTemplate(config);
  }
  */

  changeLanguage() {
    i18n.changeLanguage(this.state.language);
  }
}

PdfTemplateBuilder.propTypes = {
  language: PropTypes.oneOf(['en', 'fi'])
};

export default PdfTemplateBuilder;