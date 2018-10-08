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
    transition: 'width 0.5s ease, height 0.5s ease',
    transitionDelay: '0.2s',
    margin: 'auto'
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
  header: { minHeight: 10, borderBottom: '15px solid #eee' },
  footer: { minHeight: 10, borderTop: '15px solid #eee' }
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
    return TemplateBuilder.buildTemplate(this.props.layout, this.props.page);
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

  getGridBackground() {
    if (!this.props.gridVisible) {
      return '';
    }

    const cellSize = 15;
    const cols = this.props.paperSize.width / cellSize;

    const content = Array.apply(null, { length: cols + 1 }).map(Number.call, Number)
      .map(
        (a, i) =>
          `<rect stroke='rgb(0, 0, 0, 0.03)' stroke-width='1' fill='none' x='${Math.round(
            0 / 2 + i * cellSize,
          )}' y='${0 / 2}' width='${Math.round(
            cellSize,
          )}' height='${cellSize}'/>`,
      )
      .join('');

    return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${cellSize * cols}' height='${cellSize}'>${content}</svg>")`;
  }

  render() {
    const { classes, editorLoading} = this.props;

    let editor = <div className={classes.loader}><CircularProgress size={100} /></div>;

    if (!editorLoading) {
      editor = (
        <Paper
          id="editor"
          className={classes.editor}
          elevation={1}
          style={{
            backgroundImage: this.getGridBackground(),
            minHeight: this.props.paperSize.height,
            width: this.props.paperSize.width
          }}
        >
          <div id="pdf-template-header" className={classes.header}>
            <LayoutEditor {...this.props} parent={{ i: 'header' }} layoutMode="relative" />
          </div>

          <div style={{ flex: 1 }}>
            <LayoutEditor {...this.props} parent={{ i: 'root' }} />
          </div>

          <div id="pdf-template-footer" className={classes.footer}>
            <LayoutEditor {...this.props} parent={{ i: 'footer' }} layoutMode="relative" />
          </div>
        </Paper>
      );
    }

    return (
      <div>
        <Toolbox />
        <ElementSpeedDialContainer />

        <div className={classes.container}>
          <div className={classes.editorContainer}>
            <Paper
              id="editor"
              className={classes.editor}
              elevation={1}
              style={{
                backgroundImage: this.getGridBackground(),
                minHeight: this.props.paperSize.height,
                width: this.props.paperSize.width
              }}
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
  selectedUuid: PropTypes.string,
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
  onDeleteElement: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired
};

export default withStyles(styles)(PdfTemplateBuilder);
