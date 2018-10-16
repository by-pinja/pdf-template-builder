import React, { Component } from 'react';
import { connect } from 'react-redux';
import PdfTemplateBuilderContainer from './Container/PdfTemplateBuilderContainer';
import {configure, importTemplate} from './Store/actions';
import i18n from 'i18next';

class Provider extends Component {
  constructor(props) {
    super(props);

    this.handleProps();
  }

  componentWillReceiveProps(props) {
    this.handleProps(props);
  }

  handleProps(newProps = this.props) {
    const {
      onSave,
      onPreview,
      language,
      schema,
      onDoConfigure,
      onImportTemplate,
      template
    } = this.props;

    const config = { onSaveTemplate: onSave, onPreview, schema };

    onDoConfigure(config);

    if (template && template !== newProps.template) {
      onImportTemplate(template);
    }

    i18n.changeLanguage(language);
  }

  render() {
    return <PdfTemplateBuilderContainer />;
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  onDoConfigure: config => dispatch(configure(config)),
  onImportTemplate: template => dispatch(importTemplate(template))
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Provider);

export default Container;