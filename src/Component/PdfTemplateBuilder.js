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
    fontFamily: 'Open Sans',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    position: 'relative'
  },
  header: { minHeight: 10, borderBottom: '10px solid #eee' },
  footer: { minHeight: 10, borderTop: '10px solid #eee' }
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
    const cols = 595 / cellSize; // TODO: use page width

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
            style={{ backgroundImage: this.getGridBackground() }}
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
