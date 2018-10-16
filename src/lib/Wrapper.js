import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorContainer from './Container/EditorContainer';
import { configure, importTemplate, selectElement, setEditorLoading } from './Store/actions';
import i18n from 'i18next';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

class Wrapper extends Component {
  componentDidMount() {
    this.handleProps();
  }

  componentWillReceiveProps(props) {
    this.handleProps(props);
  }

  handleProps(newProps = {}) {
    const {
      onSave,
      onPreview,
      language,
      schema,
      onDoConfigure,
      onImportTemplate,
      template
    } = this.props;

    onDoConfigure({ onSaveTemplate: onSave, onPreview, schema });

    if (template && template !== newProps.template) {
      onImportTemplate(template);
    }

    i18n.changeLanguage(language);
  }

  render() {
    return <EditorContainer />;
  }
}

const mapDispatchToProps = dispatch => ({
  onDoConfigure: config => dispatch(configure(config)),
  onImportTemplate: template => {
    // Set editor loading while 'importing' the template
    dispatch(setEditorLoading(true));
    setTimeout(() => dispatch(setEditorLoading(false)), 1000);

    dispatch(selectElement(null));
    dispatch(importTemplate(template));
    dispatch(UndoActionCreators.clearHistory());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Wrapper);
