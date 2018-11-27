import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import TemplateBuilder from './../Util/TemplateBuilder';
import PropTypes from 'prop-types'
import ElementToolsContainer from '../Container/ElementToolsContainer';
import Toolbox from './Toolbox';
import LayoutEditor from './LayoutEditor';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import ElementSpeedDialContainer from '../Container/ElementSpeedDialContainer';
import KeymasterContainer from '../Container/KeymasterContainer';

const styles = theme => ({
  toolbox: {
    marginLeft: theme.spacing.unit * 2,
    width: 450,
    minWidth: 450
  },
  editorContainer: {
    background: theme.palette.background.default,
    borderRadius: 10,
    padding: 20,
    boxSizing: 'border-box',
    flex: 1,
    overflowX: 'auto',
  },
  editor: {
    fontFamily: 'Open Sans',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.5s ease, min-height 0.5s ease',
    transitionDelay: '0.2s',
    margin: 'auto',
    backgroundRepeat: 'repeat',
    boxSizing: 'border-box',
  },
  container: {
    display: 'flex',
    position: 'relative'
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  header: {
    minHeight: 10,
    borderBottom: '15px solid #eee',
    marginBottom: '0 !important',
  },
  footer: {
    minHeight: 10,
    borderTop: '15px solid #eee',
    marginTop: '0 !important',
}
});

class PdfTemplateBuilder extends Component {
  constructor(props) {
    super(props);

    this.getTemplateHtml     = this.getTemplateHtml.bind(this);
    this.getComponentContent = this.getComponentContent.bind(this);
    this.getGridBackground   = this.getGridBackground.bind(this);
  }

  configure(props) {
    this.props.onDoConfigure(props);
  }

  getTemplateHtml() {
    return TemplateBuilder.buildTemplate(this.props.layout, this.props.page, this.props.schema);
  }

  exportTemplate() {
    return this.props.exportTemplate();
  }

  importTemplate(config) {
    this.props.onSelectElement(null);
    this.props.onImportTemplate(config);
    this.props.onClearHistory();

    // Required for nested elements to render properly
    this.forceUpdate();
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

  getGridBackground() {
    if (!this.props.gridVisible) {
      return '';
    }

    const cellSize = 15;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${cellSize}' height='${cellSize}'>${
      `<rect stroke='rgba(0,0,0,0.06)' stroke-width='1' fill='none' x='0' y='0' width='${cellSize}' height='${cellSize}'/>`
    }</svg>`;

    return `url("data:image/svg+xml;charset=utf8;base64,${btoa(svg)}")`;
  }

  render() {
    const { classes, editorLoading, ...other } = this.props;

    let editor = <div className={classes.loader} style={{minHeight: this.props.paperSize.height}}>
      <CircularProgress size={100} />
    </div>;

    if (!editorLoading) {
      const margin = this.props.page.border || 0;
      const contentWidth = this.props.paperSize.width - margin * 2;
      const backgroundImage = this.getGridBackground();

      editor = (
        <div
          id="editor"
          className={classes.editor}
          style={{
            minHeight: this.props.paperSize.height,
            width: this.props.paperSize.width
          }}
        >
          <div id="pdf-template-header" className={classes.header} style={{ margin, backgroundImage }}>
            <LayoutEditor {...other} parent={{ i: 'header' }} layoutMode="relative" width={contentWidth} />
          </div>

          <div style={{ flex: 1, marginLeft: margin, marginRight: margin, backgroundImage }}>
            <LayoutEditor {...other} parent={{ i: 'root' }} width={contentWidth} />
          </div>

          <div id="pdf-template-footer" className={classes.footer} style={{ margin, backgroundImage }}>
            <LayoutEditor {...other} parent={{ i: 'footer' }} layoutMode="relative" width={contentWidth} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <KeymasterContainer />
        <Toolbox />
        <ElementSpeedDialContainer />

        <div className={classes.container}>
          <div className={classes.editorContainer}>
            <Paper
              className={classes.editor}
              style={{
                minHeight: this.props.paperSize.height,
                width: this.props.paperSize.width
              }}
              elevation={1}
              onClick={() => this.props.onSelectElement(null)}
            >
              {editor}
            </Paper>
          </div>

          <div className={classes.toolbox}>
            <ElementToolsContainer />
          </div>
        </div>
      </div>
    );
  }
}

PdfTemplateBuilder.propTypes = {
  schema: PropTypes.array.isRequired,
  selectedUuids: PropTypes.array,
  layout: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  exportTemplate: PropTypes.func.isRequired,
  gridVisible: PropTypes.bool.isRequired,
  paperSize: PropTypes.object.isRequired,
  onSelectElement: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
  onDoConfigure: PropTypes.func.isRequired,
  onImportTemplate: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired
};

export default withStyles(styles)(PdfTemplateBuilder);
