import React, { Component } from 'react';
import PageToolsContainer from './../Container/PageToolsContainer';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import TemplateBuilder from './../Util/TemplateBuilder';
import PropTypes from 'prop-types'
import ElementToolsContainer from '../Container/ElementToolsContainer';
import Toolbox from './Toolbox';
import LayoutEditor from './LayoutEditor';

const styles = theme => ({
  toolbox: {
    marginRight: theme.spacing.unit * 2,
    flex: 1
  },
  editor: {
    minHeight: 848,
    width: 595,
    fontFamily: 'Open Sans'
  },
  previewButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  container: {
    display: 'flex',
    position: 'relative'
  }
});

class PdfTemplateBuilder extends Component {
  constructor(props) {
    super(props);

    this.getTemplateHtml     = this.getTemplateHtml.bind(this);
    this.getComponentContent = this.getComponentContent.bind(this);
  }

  configure(props) {
    this.props.onDoConfigure(props);
  }

  getTemplateHtml() {
    return TemplateBuilder.buildTemplate(this.props.layout, this.props.page);
  }

  exportTemplate() {
    return { page: this.props.page, layout: this.props.layout };
  }

  importTemplate(config) {
    this.props.onSelectElement(null);
    this.props.onImportTemplate(config);
    this.props.onClearHistory();

    // Required for nested elements to render properly
    this.forceUpdate();
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) {
        return;
      }

      if (e.ctrlKey && e.code === 'KeyZ') {
        if (e.shiftKey) {
          return this.props.onRedo();
        }

        this.props.onUndo();
      }

      if (e.code === 'Backspace') {
        this.props.onDeleteElement(this.props.selectedUuid);
      }

      if (e.code === 'Escape') {
        this.props.onSelectElement(null);
      }
    });
  }

  getComponentContent(i) {
    const schema = this.props.schema;

    const meta = this.props.layout.root.find(e => e.i === i).meta;

    if (!meta || !meta.tag) {
      return {};
    }

    const prop = schema.find(prop => prop.tag === meta.tag);

    if (!prop) {
      return {};
    }

    return {
      text: prop.example,
      tooltip: prop.text
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Toolbox />

        <div className={classes.container}>
          <div className={classes.toolbox}>
            <PageToolsContainer />
            <ElementToolsContainer />
          </div>

          <Paper
            id="editor"
            className={classes.editor}
            elevation={1}
          >
            <LayoutEditor {...this.props} parent={{ i: 'root' }} />
          </Paper>
        </div>
      </div>
    );
  }
}

PdfTemplateBuilder.propTypes = {
  selectedUuid: PropTypes.string,
  layout: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  onSelectElement: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
  onDoConfigure: PropTypes.func.isRequired,
  onImportTemplate: PropTypes.func.isRequired,
  onDeleteElement: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired
};

export default withStyles(styles)(PdfTemplateBuilder);
