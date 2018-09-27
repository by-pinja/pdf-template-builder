import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import PageToolsContainer from './../Container/PageToolsContainer';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import TemplateBuilder from './../Util/TemplateBuilder';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import PropTypes from 'prop-types'
import ElementToolsContainer from '../Container/ElementToolsContainer';
import ToolboxContainer from '../Container/ToolboxContainer';

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
    return TemplateBuilder.buildTemplate(
      this.props.layout,
      this.props.elements
    );
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.ctrlKey && e.code === 'KeyZ') {
        if (e.shiftKey) {
          return this.props.onRedo();
        }

        this.props.onUndo();
      }

      if (e.code === 'Backspace') {
        this.props.onDeleteElement(this.props.selectedUuid);
      }
    });
  }

  getComponentContent(i) {
    const schema = this.props.schema;
    const meta = this.props.elements[i];

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
        <ToolboxContainer />

        <div className={classes.container}>
          <div className={classes.toolbox}>

            <PageToolsContainer />
            <ElementToolsContainer />
          </div>

          <Paper
            className={classes.editor}
            elevation={1}
          >
            <GridLayout
              layout={this.props.layout}
              cols={12}
              rowHeight={30}
              width={595}
              compactType={null}
              preventCollision={true}
              onLayoutChange={this.props.onChangeLayout}
            >
              {this.props.layout.map(
                e => {
                  const classes = this.props.selectedUuid === e.i ? 'active' : '';
                  const content = this.getComponentContent(e.i);

                  return (
                    <div
                      id={'component-' + e.i}
                      className={classes}
                      key={e.i}
                      data-grid={e}
                      onClick={() => this.props.onSelectElement(e.i)}
                      onDragEnd={e => e.stopPropagation()}
                      style={{ padding: 5, boxSizing: 'border-box'}}
                    >
                      <Tooltip title={content.tooltip || ''}>
                        <span>
                          {content.text}
                        </span>
                      </Tooltip>
                    </div>
                  );
                })
              }
            </GridLayout>
          </Paper>
        </div>
      </div>
    );
  }
}

PdfTemplateBuilder.propTypes = {
  selectedUuid: PropTypes.string,
  onSelectElement: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
  onDoConfigure: PropTypes.func.isRequired,
  onDeleteElement: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired
};

export default withStyles(styles)(PdfTemplateBuilder);